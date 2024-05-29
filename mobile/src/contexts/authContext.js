import { createContext, useState, useEffect } from 'react';
import { login, logout, refresh } from '../cruds/auth';
import { getLoggedUser } from '../cruds/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFRESH_TOKEN_STORAGE_KEY, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../consts';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
            const storagedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }

            await doRefreshToken();
        }
    
        loadStorageData();

        const MINUTE_MS = 3000;
        const interval = setInterval(() => {
            doRefreshToken();
        }, MINUTE_MS);
    }, []);

    async function doLogin(username, password) {
        const response = await login(username, password);
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access)
        await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refresh)
        
        await refreshUser();
    }

    async function refreshUser(){
        let user = await getLoggedUser();
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        setUser(user);
    }
    
    async function doLogout(){
        await logout();
        await AsyncStorage.clear();
        setUser(null);
    }

    async function doRefreshToken(){
        if(user === null) return;
        console.log('Refreshing token...');
        const response = await refresh();
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access);
    }

    return (
        <AuthContext.Provider value={{ logged: !!user, user, doLogin, doLogout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};
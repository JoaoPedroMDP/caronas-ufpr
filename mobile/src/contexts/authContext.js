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
            const storagedRefreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
        
            console.log(storagedUser);
            console.log(storagedToken);
            console.log(storagedRefreshToken);

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }

            await doRefreshToken();
        }
    
        loadStorageData();

        const MINUTE_MS = 350000;
        const interval = setInterval(() => {
            console.log('Refreshing token...');
            doRefreshToken();
        }, MINUTE_MS);
        return () => clearInterval(interval);
    }, []);

    async function doLogin(username, password) {
        const response = await login(username, password);
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access)
        await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refresh)
        
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
        if (!user) return;
        const response = await refresh();
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access);
    }

    return (
        <AuthContext.Provider value={{ logged: !!user, user, doLogin, doLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
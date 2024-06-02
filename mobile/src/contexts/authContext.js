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
                const parsed_user = JSON.parse(storagedUser);
                setUser(parsed_user);
                await doRefreshToken();
            }
        }
    
        loadStorageData();

        const MINUTE_MS = 1000 * 60 * 5; // 5 minutos
        const interval = setInterval(async () => {
            await doRefreshToken();
        }, MINUTE_MS);
    }, []);

    async function doLogin(username, password) {
        const response = await login(username, password);
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access)
        await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refresh)
        
        await refreshUser();
    }

    async function refreshUser(){
        console.log("Refreshing user...");
        try{
            let user = await getLoggedUser();
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            setUser(user);
        }catch(e){
            console.log("Erro ao atualizar usuário logado: " + e);
            await doLogout();
        }
    }
    
    async function doLogout(){
        try{
            await logout();
        }catch(e){
            console.log("Rota de logout retornou o seguinte erro: " + e);
        }

        await AsyncStorage.clear();
        setUser(null);
    }

    async function doRefreshToken(){
        console.log('Refreshing token...');
        try{
            const response = await refresh();
            await AsyncStorage.setItem(TOKEN_STORAGE_KEY, response.access);
        }catch(e){
            await doLogout();
        }        
    }

    return (
        <AuthContext.Provider value={{ logged: !!user, user, doLogin, doLogout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};
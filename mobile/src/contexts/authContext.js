import { createContext, useState } from 'react';
import { login } from '../cruds/auth';
import { getLoggedUser } from '../cruds/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function doLogin(username, password) {
        const response = await login(username, password);
        await AsyncStorage.setItem('token', response.access)
        await AsyncStorage.setItem('refreshToken', response.refresh)
        
        let user = await getLoggedUser();
        setUser(user);
    }

    async function doLogout(){
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ logged: !!user, user, doLogin, doLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
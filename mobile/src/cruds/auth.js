import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';
import { REFRESH_TOKEN_STORAGE_KEY } from '../consts';

const URIS = {
    login: '/login',
    logout: '/logout',
    refresh: '/refresh'
};


function login(username, password){
    let result = axios.post(env.back_end + URIS['login'], { username, password })
    .then(async (response) => {
        return response.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            throw new Error('Email ou senha inválidos');
        }else if(error.response.status === 500){
            throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
        }
    });

    return result;
}

const logout = async () => {
    let result = axios.post(env.back_end + URIS['logout'], { refresh_token: await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) })
    .then(async () => {
        return true;
    })
    .catch((error) => {
        console.log('Erro ao realizar logout:', error);
        return false;
    });

    return result;
};

const refresh = async () => {
    let refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    let result = axios.post(env.back_end + URIS['refresh'], { refresh: refreshToken })
    .then(async (response) => {
        return response.data;
    })
    .catch((error) => {
        console.log('Erro ao realizar logout:', error);
        return false;
    });

    return result;

}

export { login, logout, refresh };

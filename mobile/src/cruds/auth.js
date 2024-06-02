import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';
import { REFRESH_TOKEN_STORAGE_KEY } from '../consts';

const URIS = {
    login: '/routes/login',
    logout: '/routes/logout',
    refresh: '/routes/refresh',
    requestPassReset: '/routes/request_password_reset',
    resetPass: '/routes/reset_password'
};


function login(username, password){
    console.log("Realizando login...");
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
    console.log("Realizando logout...");
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
    console.log("Realizando refresh...");
    let refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    let result = axios
        .post(env.back_end + URIS['refresh'], { refresh: refreshToken })
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log('Erro ao renovar token:', error);
            throw new Error('Erro ao renovar token');
        });

    return result;

}

const requestPasswordReset = async (email) => {
    let config = {
        params: { email: email }
    }

    let result = axios
        .get(env.back_end + URIS['requestPassReset'], config)
        .then(async (response) => {
            return response;
        })
        .catch((error) => {
            console.log('Erro ao tentar resetar a senha:', error);
            throw new Error('Erro ao tentar resetar a senha');
        });

    return result;
}


const resetPassword = async (token ,password) => {
    let data = {
        password: password,
        token: token
    }

    let result = axios
        .post(env.back_end + URIS['resetPass'], data)
        .then(async (response) => {
            return response;
        })  
        .catch((error) => {
            console.log('Erro ao tentar resetar a senha:', error);
            throw new Error('Erro ao tentar resetar a senha');
        });

    return result;
}

export { login, logout, refresh, requestPasswordReset, resetPassword };

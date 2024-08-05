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


async function login(username, password){
    console.log("Realizando login...");
    try{
        let response = await axios.post(env.back_end + URIS['login'], { username, password });
        return response.data;
    }catch(error){
        console.log(error.message);
        if (error.response && error.response.status === 401) {
            throw new Error('Email ou senha inválidos');
        }else if(error.response.status === 500){
            throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
        }else if(error.response.status == 404){
            throw new Error("Não foi possível encontrar o servidor. Os administradores já foram notificados");
        }else{
            throw new Error("Erro desconhecido. Tente novamente mais tarde.");
        }
    }

    return result;
}

async function logout() {
    console.log("Realizando logout...");
    let refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    try{
        let result = await axios.post(env.back_end + URIS['logout'], { refresh_token: refreshToken})
        return true;
    }catch(error){
        console.log('Erro ao realizar logout:', error);
        return false;
    }
};

async function refresh() {
    console.log("Realizando refresh...");
    let refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    
    try{
        let response = await axios.post(env.back_end + URIS['refresh'], { refresh: refreshToken })
        return response.data;
    }catch(error){
        console.log('Erro ao renovar token:', error);
        throw new Error('Erro ao renovar token');
    }

}

const requestPasswordReset = async (email) => {
    let config = {
        params: { email: email }
    }

    try{
        let response = axios.get(env.back_end + URIS['requestPassReset'], config)
        return response;
    }catch(error){
        console.log('Erro ao tentar resetar a senha:', error);
        throw new Error('Erro ao tentar resetar a senha');
    }
}


const resetPassword = async (token ,password) => {
    let data = {
        password: password,
        token: token
    }

    try{
        let response = axios.post(env.back_end + URIS['resetPass'], data)
        return response;
    }catch(error){
        console.log('Erro ao tentar resetar a senha:', error);
        throw new Error('Erro ao tentar resetar a senha');
    }
}

export { login, logout, refresh, requestPasswordReset, resetPassword };

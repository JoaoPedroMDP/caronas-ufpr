import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';

const URIS = {
    login: '/login',
    logout: '/logout'
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
    let result = axios.post(env.back_end + URIS['logout'], { refresh_token: await AsyncStorage.getItem('refreshToken') })
    .then(async () => {
        return true;
    })
    .catch((error) => {
        console.log('Erro ao realizar logout:', error);
        return false;
    });

    return result;
};

export { login, logout };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';
import { TOKEN_STORAGE_KEY } from '../consts';
import { getConfig } from './utils';

const URIS = {
    getLoggedUser: '/logged',
    createUser: '/users',
    updateUser: '/users',
    getUserByRoute: '/users/by_route/',
};

async function getLoggedUser(){
    let config = await getConfig();
    let result = axios.get(env.back_end + URIS.getLoggedUser, config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            console.log('Token inválido.');
            AsyncStorage.setItem(TOKEN_STORAGE_KEY, '');
            return null;
        }else if(error.response.status === 500){
            console.log('Erro interno no servidor. Tente novamente mais tarde.');
            throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
        }
    });

    return result;
}


async function createUser(userData){
    let data = await axios
        .post(env.back_end + URIS.createUser, userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Erro ao criar usuário no banco local: " + error);
            throw Error("Impossível criar o usuário");
        });
    
    return data;
}


async function updateUser(userFormData, userId){
    let config = await getConfig();

    let data = await axios
        .put(env.back_end + URIS.updateUser + `/${userId}`, userFormData, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Impossível atualizar o usuário");
        });
    
    return data;
}


async function getUsersByRoute(route_id){
    let config = await getConfig();

    let users = await axios
        .get(env.back_end + URIS.getUserByRoute + route_id, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível buscar usuários para essa rota.");
        });
    
    return users;
}

export { getLoggedUser, createUser, updateUser, getUsersByRoute };

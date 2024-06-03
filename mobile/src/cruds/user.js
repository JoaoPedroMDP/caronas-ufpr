import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';
import { TOKEN_STORAGE_KEY } from '../consts';
import { getConfig } from './utils';

const URIS = {
    getLoggedUser: '/routes/logged',
    createUser: '/routes/users',
    updateUser: '/routes/users',
    getUserByRoute: '/routes/users/by_route/',
};

async function getLoggedUser(){
    console.log("Pegando usuário logado...");
    let config = await getConfig();
    let result = axios
        .get(env.back_end + URIS.getLoggedUser, config)
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
    console.log("Criando usuário...");
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    let data = await axios
        .post(env.back_end + URIS.createUser, userData, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            console.log("Erro ao criar usuário no banco local: " + error);
            throw Error("Impossível criar o usuário");
        });
    
    return data;
}


async function updateUser(userFormData, userId){
    console.log("Atualizando usuário...");
    let config = await getConfig();
    config.headers['Content-Type'] = 'multipart/form-data';

    let data = await axios
        .put(env.back_end + URIS.updateUser + `/${userId}`, userFormData, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
    
    return data;
}


async function getUsersByRoute(route_id){
    console.log("Buscando usuários para a rota...");
    let config = await getConfig();

    let users = await axios
        .get(env.back_end + URIS.getUserByRoute + route_id, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error(error.message);
        });
    
    return users;
}

export { getLoggedUser, createUser, updateUser, getUsersByRoute };

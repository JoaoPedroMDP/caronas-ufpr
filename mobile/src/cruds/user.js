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

async function getLoggedUser() {
    console.log("Pegando usuário logado...");
    let config = await getConfig();

    try {
        let response = await axios.get(env.back_end + URIS.getLoggedUser, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Token inválido.');
            await AsyncStorage.setItem(TOKEN_STORAGE_KEY, '');
            return null;
        } else if (error.response && error.response.status === 500) {
            console.log('Erro interno no servidor. Tente novamente mais tarde.');
            throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
        } else {
            console.log('Erro desconhecido ao pegar usuário logado: ', error);
            throw new Error('Erro ao pegar usuário logado.');
        }
    }
}

async function createUser(userData) {
    console.log("Criando usuário...");
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        let response = await axios.post(env.back_end + URIS.createUser, userData, config);
        return response.data;
    } catch (error) {
        console.log("Erro ao criar usuário: ", error);
        throw new Error("Impossível criar o usuário.");
    }
}

async function updateUser(userFormData, userId) {
    console.log("Atualizando usuário...");
    let config = await getConfig();
    config.headers['Content-Type'] = 'multipart/form-data';

    try {
        let response = await axios.put(env.back_end + URIS.updateUser + `/${userId}`, userFormData, config);
        return response.data;
    } catch (error) {
        console.log("Erro ao atualizar usuário: ", error);
        throw new Error("Impossível atualizar o usuário.");
    }
}

async function getUsersByRoute(route_id) {
    console.log("Buscando usuários para a rota...");
    let config = await getConfig();

    try {
        let response = await axios.get(env.back_end + URIS.getUserByRoute + route_id, config);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar usuários para a rota: ", error);
        throw new Error("Erro ao buscar usuários para a rota.");
    }
}


export { getLoggedUser, createUser, updateUser, getUsersByRoute };

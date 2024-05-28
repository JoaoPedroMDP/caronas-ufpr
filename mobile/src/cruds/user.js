import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';
import { TOKEN_STORAGE_KEY } from '../consts';

const URIS = {
    getLoggedUser: '/logged',
};

async function getLoggedUser(){
    let token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    let result = axios.get(env.back_end + URIS.getLoggedUser, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
        // console.log(response);
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


async function createUser(){}

export { getLoggedUser };

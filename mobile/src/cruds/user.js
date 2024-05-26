import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';

const URIS = {
    getLoggedUser: '/logged',
};

async function getLoggedUser(){
    let token = await AsyncStorage.getItem('token');
    let result = axios.get(env.back_end + URIS.getLoggedUser, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
        // console.log(response);
        return response.data;
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            console.log('Token inválido.');
            AsyncStorage.setItem('token', '');
            return null
        }else if(error.response.status === 500){
            console.log('Erro interno no servidor. Tente novamente mais tarde.');
            throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
            return null;
        }
    });

    return result;
}

export { getLoggedUser };

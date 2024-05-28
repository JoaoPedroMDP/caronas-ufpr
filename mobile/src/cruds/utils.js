import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY } from '../consts';

async function prepareHeaders(){
    let token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    return {
        "Authorization": "Bearer " + token
    }

}


async function getConfig(){
    let config = {
        headers: await prepareHeaders()
    };

    return config;
}

export { getConfig };
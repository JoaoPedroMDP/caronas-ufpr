import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY } from '../consts';

async function prepareHeaders(){
    try{
        let token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        return {
            "Authorization": "Bearer " + token
        }
    }catch(e){
        console.log("Erro ao pegar token do AsyncStorage: " + e);
        throw Error("Erro ao pegar token do AsyncStorage");
    }


}


async function getConfig(){
    let config = {
        headers: await prepareHeaders()
    };

    return config;
}

export { getConfig };
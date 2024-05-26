import axios from "axios";
import env from "../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE_KEY } from "../consts";


const routesApi = axios.create({
    baseURL: env.back_end + '/places'
});

async function prepareHeaders(){
    let token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    return {
        "Authorization": "Bearer " + token
    }

}

async function getPlaces(){
    let config = {
        headers: await prepareHeaders()
    };

    let data = await routesApi
        .get("", config)
        .then((response) => {
            return response.data;
        })  
        .catch((error) => {
            throw Error("Impossível carregar os locais");
        });
    
    return data;
}

export { getPlaces };
import axios from "axios";
import env from "../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE_KEY } from "../consts";
import { getConfig } from "./utils";


const routesApi = axios.create({
    baseURL: env.back_end + '/places'
});

async function getPlaces(){
    console.log("Pegando locais...");
    let config = await getConfig();

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
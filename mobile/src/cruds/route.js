import env from '../../env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY } from '../consts';

const routesApi = axios.create({
    baseURL: env.back_end + '/routes'
});

async function prepareHeaders(){
    let token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    return {
        "Authorization": "Bearer " + token
    }

}

async function saveRoute (origin, destiny, arriveTime, weekDays, userIntentions, userId) {
    let data = {
        "name": `${origin.name} -> ${destiny.name}`,
        "intentions": userIntentions,
        "from_place": origin,
        "to_place": destiny,
    };

    let config = {
        headers: await prepareHeaders()
    };

    try{
        routesApi.post("", data, config)
            .catch((error) => {
                console.log("Não foi possível criar a rota: " + error)
                throw Error("Não foi possível criar a rota.");
            });
    }catch(error){
        console.log("Erro ao salvar a rota: " + error.message);
        throw Error(error.message);
    }
}


async function getRoutes(){
    let config = {
        headers: await prepareHeaders()
    };

    let routes = await routesApi
        .get("", config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar as rotas.");
        });
    return routes;
}


async function getUsersByRoute(route_id){
    let config = {
        headers: await prepareHeaders()
    };

    let users = await routesApi
        .get(`${route_id}/get_route_users`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível buscar usuários para essa rota.");
        });
    
    return users;
}
export { saveRoute, getRoutes };
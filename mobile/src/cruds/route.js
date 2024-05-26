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
        "user": userId
    };

    let config = {
        headers: await prepareHeaders()
    };

    try{
        let response = await routesApi
            .post("", data, config)
            .catch((error) => {
                console.log("Não foi possível criar a rota: " + error)
                throw Error("Não foi possível criar a rota.");
            });
        const newRouteId = response.data.id;

        let originId = await saveEndpoint(origin.id, newRouteId, "origin");
        let destinyId = await saveEndpoint(destiny.id, newRouteId, "destiny", arriveTime);
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
        .get("", {}, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar as rotas.");
        });
    return routes;
}

export { saveRoute, getRoutes };
import env from '../../env';
import axios from 'axios';
import { getConfig } from './utils';

const routesApi = axios.create({
    baseURL: env.back_end + '/routes'
});

async function saveRoute (origin, destiny, arriveTime, weekDays, userIntentions) {
    console.log("Salvando rota...")
    let data = {
        "name": `${origin.name} -> ${destiny.name}`,
        "intentions": userIntentions,
        "from_place": origin,
        "to_place": destiny,
        "arrive_time": arriveTime,
        "week_days": weekDays,
    };

    let config = await getConfig();

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
    console.log("Pegando rotas...");
    let config = await getConfig();

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

export { saveRoute, getRoutes };
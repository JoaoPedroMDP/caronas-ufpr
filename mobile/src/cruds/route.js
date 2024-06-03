import env from '../../env';
import axios from 'axios';
import { getConfig } from './utils';

const URIS = {
    saveRoute: '/routes/routes',
    getRoutes: '/routes/routes',
    deleteRoute: '/routes/routes/'
};


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
        axios.post(env.back_end + URIS.saveRoute, data, config)
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

        try{
            let routes = await axios
                .get(env.back_end + URIS.getRoutes, config)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });

            return routes;
        }catch(error){
            console.log("Erro ao pegar as rotas: " + error.message);
            throw Error(error.message);
        };

}

async function deleteRoute(route){
    console.log("Deletando rota...");
    let config = await getConfig();

    try{
        axios.delete(env.back_end + URIS.deleteRoute + `${route.id}`, config)
            .catch((error) => {
                console.log("Não foi possível deletar a rota: " + error)
                throw Error("Não foi possível deletar a rota.");
            });
    }catch(error){
        console.log("Erro ao deletar a rota: " + error.message);
        throw Error(error.message);
    }
}
export { saveRoute, getRoutes, deleteRoute };
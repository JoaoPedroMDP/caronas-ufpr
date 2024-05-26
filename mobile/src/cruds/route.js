import env from '../../env';

const URIS = {
    saveRoute: '/routes',
    getRoutes: '/routes'
};

async function saveRoute (origin, destiny, arriveTime, weekDays, userIntentions, userId) {
    try{
        let response = await caronasApi
            .post(env.back_end + URIS.saveRoute, {
                "name": `${origin.name} -> ${destiny.name}`,
                "intentions": userIntentions,
                "user": userId
            })
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
    let routes = await caronasApi
        .get(env.back_end + URIS.getRoutes)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar as rotas.");
        });
    return routes;
}
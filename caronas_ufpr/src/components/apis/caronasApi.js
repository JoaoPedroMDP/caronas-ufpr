import axios from 'axios';

const caronasApi = axios.create({
    baseURL: "https://joaopedromdp-reimagined-space-system-7rr6w7475rqcxgw-8000.preview.app.github.dev"
})

async function saveRoute (origin, destiny, arriveTime, weekDays, userIntentions, userId) {
    try{
        let response = await caronasApi
            .post("/routes/routes/", {
                "name": `${origin.name} -> ${destiny.name}`,
                "intentions": userIntentions,
                "user": userId
            })
            .catch((error) => {
                console.log(error.response.data);
                console.log(error.response.status);
                throw Error("Não foi possível criar a rota.");
            });
        const newRouteId = response.data.id;

        let originId = await saveEndpoint(origin.id, newRouteId, "origin");
        let destinyId = await saveEndpoint(destiny.id, newRouteId, "destiny", arriveTime);

        console.log([originId, destinyId]);
    }catch(error){
        throw Error(error.message);
    }
}

async function saveEndpoint (placeId, routeId, type, arriveTime){
    let data = {
        "place": placeId,
        "route": routeId,
        "type": type,
    }

    if(arriveTime){
        data["arrive_time"] = arriveTime;
    }
    
    let response = await caronasApi
        .post("/routes/endpoints/", data)
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            throw Error("Não foi possível criar o local de partida/chegada.");
        });
    const endpointId = response.data.id;
    return endpointId;
}

async function getRoutes(){
    let response = await caronasApi
        .get("/routes/routes/")
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            throw Error("Não foi possível carregar as rotas.");
        });
    let routes = response.data;
    return routes;
}

async function getUsersByRoute(route){
    let response = await caronasApi
        .get("/routes/routes/")
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            throw Error("Não foi possível buscar usuários para essa rota.");
        });
    let routes = response.data;
}

async function getPlaces(){
    let data = await caronasApi
        .get("/routes/places/")
        .then((response) => {
            return response.data;
        })  
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            throw Error("Impossível carregar os locais");
        });
    
    return data;
}

function validateData(origin, destiny, arriveTime, weekDays, userIntentions, userId){
    if(origin === null || origin == ""){
        console.log("Origem não pode ser nula");
        throw new Error("Origem não pode ser nula");
    }

    if(destiny === null || destiny == ""){
        console.log("Destino não pode ser nulo");
        throw new Error("Destino não pode ser nulo");
    }

    if(arriveTime === null || arriveTime == ""){
        console.log("Horário de chegada não pode ser nulo");
        throw new Error("Horário de chegada não pode ser nulo");
    }

    if(userIntentions === []){
        console.log("Intenções não podem ser nulas");
        throw new Error("Intenções não podem ser nulas");
    }
}

export { saveRoute, saveEndpoint, getRoutes, getPlaces, validateData };

import axios from 'axios';
import env from '../../../env';

const baseUrl = env.back_end
const caronasApi = axios.create({
    baseURL: baseUrl
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
            console.log("Erro ao salvar endpoint:" + error)
            throw Error("Não foi possível criar o local de partida/chegada.");
        });
    const endpointId = response.data.id;
    return endpointId;
}

async function getRoutes(){
    let routes = await caronasApi
        .get("/routes/routes/")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar as rotas.");
        });
    return routes;
}

function validateData(origin, destiny, arriveTime, weekDays, userIntentions){
    if(origin === null || origin == ""){
        throw new Error("Origem não pode ser nula");
    }

    if(destiny === null || destiny == ""){
        throw new Error("Destino não pode ser nulo");
    }

    if(arriveTime === null || arriveTime == ""){
        throw new Error("Horário de chegada não pode ser nulo");
    }

    if(userIntentions == []){
        throw new Error("Intenções não podem ser nulas");
    }
}

async function getUsersByRoute(route_id){
    let users = await caronasApi
        .get(`/routes/routes/${route_id}/get_route_users`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível buscar usuários para essa rota.");
        });
    
    return users;
}

function getImage(partialUrl){
    return `${baseUrl}${partialUrl}`;
}

async function getPlaces(){
    let data = await caronasApi
        .get("/routes/places/")
        .then((response) => {
            return response.data;
        })  
        .catch((error) => {
            throw Error("Impossível carregar os locais");
        });
    
    return data;
}

async function getUserByFirebaseId(firebaseId){
    let data = await caronasApi
        .get(`/routes/users/firebase/${firebaseId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Impossível carregar o usuário");
        });
    
    return data;
}

async function updateUser(userFormData, userId){
    let data = await caronasApi
        .put(`/routes/users/${userId}/`, userFormData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Impossível atualizar o usuário");
        });
    
    return data;
}

async function createUser(userData, firebaseId){
    let data = await caronasApi
        .post(`/routes/users/`, userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Erro ao criar usuário no banco local: " + error);
            throw Error("Impossível criar o usuário");
        });
    
    return data;
}

export { saveRoute, saveEndpoint, getRoutes, getPlaces, validateData, getUsersByRoute, getImage, getUserByFirebaseId, updateUser, createUser };

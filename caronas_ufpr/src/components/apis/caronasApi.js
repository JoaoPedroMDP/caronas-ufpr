import axios from 'axios';

const caronasApi = axios.create({
    baseURL: "https://joaopedromdp-reimagined-space-system-7rr6w7475rqcxgw-8000.preview.app.github.dev"
})

async function saveRoute (origin, destiny, arriveTime, weekDays, userIntentions, userId) {
    try{
        let response = await caronasApi.post("/routes/routes/", {
            "name": `${origin.name} -> ${destiny.name}`,
            "intentions": userIntentions,
            "user": userId
        });
        const newRouteId = response.data.id;
        console.log(newRouteId);

        let originId = await saveEndpoint(origin.id, newRouteId, "origin");
        let destinyId = await saveEndpoint(destiny.id, newRouteId, "destiny", arriveTime);

        console.log([originId, destinyId]);
    }catch(error){
        console.log(error);
        return false;
    }
    
    return true;
}

async function saveEndpoint (placeId, routeId, type, arriveTime = null){
    let data = {
        "place": placeId,
        "route": routeId,
        "type": type,
    }

    if(arriveTime){
        data["arrive_time"] = arriveTime;
    }
    
    let response = await caronasApi.post("/routes/endpoints/", data);
    const endpointId = response.data.id;
    return endpointId;
}

async function getRoutes(){
    let response = await caronasApi.get("/routes/routes/");
    let routes = response.data;
    return routes;
}

async function getUsersByRoute(route){
    let response = await caronasApi.get("/routes/routes/");
    let routes = response.data;
}

async function getPlaces(){
    let response = await caronasApi.get("/routes/places/");
    let endpoints = response.data;
    return endpoints;
}

export { saveRoute, saveEndpoint, getRoutes, getPlaces }
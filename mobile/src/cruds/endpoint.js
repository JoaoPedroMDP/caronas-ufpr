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
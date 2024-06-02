import axios from "axios";
import { getConfig } from "./utils";
import env from "../../env";

const URIS = {
    listPartReqs: '/routes/partnerships/requests',
    listPart: '/routes/partnerships',
    askPart: '/routes/partnerships',
    changePartStatus: '/routes/partnerships/'
};

async function listPartnershipRequests(){
    console.log("Pegando pedidos de parcerias...");
    let config = await getConfig();

    let response = axios
        .get(env.back_end + URIS.listPartReqs, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar os pedidos de parceria.");
        });
    
    return response;
}


async function listPartnerships(){
    console.log("Pegando parcerias...");
    let config = await getConfig();

    let response = axios
        .get(env.back_end + URIS.listPart, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar as parcerias.");
        });
    
    return response;
}

async function askPartnership(requestant, requested, route){
    console.log("Pedindo parceria...");
    let config = await getConfig();
    let data = {
        "requestant": requestant.id,
        "requested": requested.id,
        "route": route.id,
    };

    let response = axios
        .post(env.back_end + URIS.askPart, data, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível pedir parceria.");
        });
    
    return response;
}

async function changePartnershipStatus(request, status){
    console.log("Mudando status da parceria...");
    let config = await getConfig();
    let data = {
        "status": status,
    };

    let response = axios
        .patch(env.back_end + URIS.changePartStatus + request.id, data, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível mudar o status da parceria.");
        });
    
    return response;

}

export { listPartnerships, askPartnership, listPartnershipRequests, changePartnershipStatus };

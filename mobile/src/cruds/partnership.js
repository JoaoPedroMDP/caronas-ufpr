import axios from "axios";
import { getConfig } from "./utils";
import env from "../../env";

const URIS = {
    listPartReqs: '/routes/partnerships/requests',
    listPart: '/routes/partnerships',
    askPart: '/routes/partnerships',
    changePartStatus: '/routes/partnerships/'
};

async function listPartnershipRequests() {
    try {
        console.log("Pegando pedidos de parcerias...");
        let config = await getConfig();
        let response = await axios.get(env.back_end + URIS.listPartReqs, config);
        return response.data;
    } catch (error) {
        throw new Error("Não foi possível carregar os pedidos de parceria.");
    }
}


async function listPartnerships() {
    try {
        console.log("Pegando parcerias...");
        let config = await getConfig();
        let response = await axios.get(env.back_end + URIS.listPart, config);
        return response.data;
    } catch (error) {
        throw new Error("Não foi possível carregar as parcerias.");
    }
}

async function askPartnership(requestant, requested, route) {
    try {
        console.log("Pedindo parceria...");
        let config = await getConfig();
        let data = {
            "requestant": requestant.id,
            "requested": requested.id,
            "route": route.id,
        };
        let response = await axios.post(env.back_end + URIS.askPart, data, config);
        return response.data;
    } catch (error) {
        throw new Error("Não foi possível pedir parceria.");
    }
}

async function changePartnershipStatus(request, status) {
    try {
        console.log("Mudando status da parceria...");
        let config = await getConfig();
        let data = {
            "status": status,
        };
        let response = await axios.patch(env.back_end + URIS.changePartStatus + request.id, data, config);
        return response.data;
    } catch (error) {
        throw new Error("Não foi possível mudar o status da parceria.");
    }
}


export { listPartnerships, askPartnership, listPartnershipRequests, changePartnershipStatus };

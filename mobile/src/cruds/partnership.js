import { getConfig } from "./utils";


async function listPartnerships(){
    let config = await getConfig();

    let response = axios
        .get(env.back_end + '/partnerships', config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw Error("Não foi possível carregar as parcerias.");
        });
}

export { listPartnerships };
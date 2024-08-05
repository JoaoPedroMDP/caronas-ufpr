import axios from "axios";
import env from "../../env";
import { getConfig } from "./utils";

const URIS = {
    getPlaces: '/routes/places',
};

async function getPlaces() {
    try {
        console.log("Pegando locais...");
        let config = await getConfig();
        let response = await axios.get(env.back_end + URIS.getPlaces, config);
        return response.data;
    } catch (error) {
        throw new Error("Impossível carregar os locais");
    }
}


export { getPlaces };
import axios from "axios";
import env from "../../env";
import { getConfig } from "./utils";

const URIS = {
    getPlaces: '/routes/places',
};

async function getPlaces(){
    console.log("Pegando locais...");
    let config = await getConfig();

    let data = await axios
        .get(env.back_end + URIS.getPlaces, config)
        .then((response) => {
            return response.data;
        })  
        .catch((error) => {
            throw Error("Impossível carregar os locais");
        });
    
    return data;
}

export { getPlaces };
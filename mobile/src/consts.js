import { Dimensions } from 'react-native';

const availableWeekDays = [
    { "key": "Dom", "label": "D" },
    { "key": "Seg", "label": "S" },
    { "key": "Ter", "label": "T" },
    { "key": "Qua", "label": "Q" },
    { "key": "Qui", "label": "Q" },
    { "key": "Sex", "label": "S" },
    { "key": "Sáb", "label": "S" }
];

const intentions = [
    { "id": "offer_ride", "label": "Ofereço Carona", "value": "offer_ride" },
    { "id": "receive_ride", "label": "Busco Carona", "value": "receive_ride" },
    { "id": "split_app", "label": "Rachar aplicativo", "value": "split_app" },
    { "id": "bus_pal", "label": "Companhia de busão", "value": "bus_pal" }
];

const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

const USER_STORAGE_KEY = 'caronas_ufpr_user';
const TOKEN_STORAGE_KEY = 'caronas_ufpr_token';
const REFRESH_TOKEN_STORAGE_KEY = 'caronas_ufpr_refresh_token';

export { availableWeekDays, intentions, vw, vh, TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, USER_STORAGE_KEY};
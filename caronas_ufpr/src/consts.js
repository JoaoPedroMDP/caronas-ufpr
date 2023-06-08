const availableWeekDays = [
    { "key": "Dom", "label": "D" },
    { "key": "Seg", "label": "S" },
    { "key": "Ter", "label": "T" },
    { "key": "Qua", "label": "Q" },
    { "key": "Qui", "label": "Q" },
    { "key": "Sex", "label": "S" },
    { "key": "Sáb", "label": "S" }
];

// Coloco o ID para usar no RadioGroup
const uniqueIntentions = [
    { "id": "offer_ride", "label": "Oferecer Carona", "value": "offer_ride" },
    { "id": "receive_ride", "label": "Procurar Carona", "value": "receive_ride" }
];

const intentions = [
    { "id": "split_app", "label": "Rachar aplicativo", "value": "split_app" },
    { "id": "bus_pal", "label": "Companhia de busão", "value": "bus_pal" }
];

export { availableWeekDays, uniqueIntentions, intentions };
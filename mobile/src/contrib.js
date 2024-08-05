import { Black, White } from '../assets/colors';
import env from '../env';

function pickablelize(items = []) {
    let finalItems = [];
    for (let i = 0; i < items.length; i++) {
        finalItems.push({ label: items[i], key: items[i] });
    }

    return finalItems;
}

function toCheckboxGroupFormat(data) {
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
        finalData.push({
            id: i,
            text: data[i].label,
            value: data[i].value,
            size: 25,
            bouncinessIn: 0,
            bouncinessOut: 0,
            fillColor: Black,
            unfillColor: White,
            innerIconStyle: { borderWidth: 2 },
            textStyle: { fontFamily: "InterBold", fontSize: 10, color: Black, textDecorationLine: "none" },
        });
    }

    return finalData;
}

function getFormattedTime(time) {
    // Time vem como 00:00:00. Quero tirar os dois últmos zeros
    return time.substring(0, time.length - 3);
}

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

function getImage(partialUrl){
    return `${env.back_end}${partialUrl}`;
}

export { pickablelize, toCheckboxGroupFormat, getFormattedTime, sanitizeString, getImage };
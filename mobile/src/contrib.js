import { Black, White } from '../assets/colors';

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

function getFormattedDateTimeString(date) {
    "YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString().padStart(2, "0");
    day = date.getDate().toString().padStart(2, "0");
    hour = date.getHours().toString().padStart(2, "0");
    minute = date.getMinutes().toString().padStart(2, "0");
    
    return `${year}-${month}-${day}T${hour}:${minute}`;
}

export { pickablelize, toCheckboxGroupFormat, getFormattedDateTimeString };
import { Black, White } from '../assets/colors';

function pickablelize(items) {
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
            textStyle: { "fontFamily": "InterMedium", "color": Black }
        });
    }

    return finalData;
}

export { pickablelize, toCheckboxGroupFormat };
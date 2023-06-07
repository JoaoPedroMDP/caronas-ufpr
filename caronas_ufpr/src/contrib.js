
function keify(items) {
    let finalItems = [];
    for (let i = 0; i < items.length; i++) {
        finalItems.push({ key: i, value: items[i] });
    }

    return finalItems;
}

function pickablelize(items) {
    let finalItems = [];
    for (let i = 0; i < items.length; i++) {
        finalItems.push({ label: items[i], key: items[i] });
    }

    return finalItems;
}

export { keify, pickablelize };
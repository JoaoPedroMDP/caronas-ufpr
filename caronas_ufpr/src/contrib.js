
function keify(items) {
    let finalItems = [];
    for(let i=0; i< items.length; i++){
        finalItems.push({key: i, value: items[i]});
    }

    return finalItems;
}

function dropdownize(items){
    let finalItems = [];
    for(let i=0; i< items.length; i++){
        finalItems.push({label: items[i], value: items[i]});
    }

    return finalItems;
}

export {keify, dropdownize};
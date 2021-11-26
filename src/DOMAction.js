const getElemById = (id) => {
    return document.getElementById(id);
}

export const mapDomElements = (listOfId) => {
    let singleViewElem = {}
    for(let id of listOfId){
        singleViewElem[id] = getElemById(id)
    }

    return singleViewElem
}
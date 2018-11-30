export const isObjEmpty = obj => {
    try {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    } catch (error) {
        return true;
    }
}

export const convertFloatToBRLCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
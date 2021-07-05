/**
 * Given a price string, cast to Number given a decimal separator
 * 
 * @param {String} string 
 * @param {String} decimalSeparator 
 * @returns {Number} price
 */
function string2Number(string, decimalSeparator='.') {
    if (decimalSeparator == '.') {
        return Number(string.split(",").join(""))
    }
    else if (decimalSeparator == ',') {
        return Number(string.split(".").join("").replace(',', '.'))
    }
}

/**
 * Given a price string, returns currency and value
 * @param {String} string 
 * @param {String} decimalSeparator 
 * @returns {Object} currency and value
 */
function parsePrice(string, decimalSeparator='.') {
    try{
        let regexMatchArray = string.trim().match(/^(\D*\$\D*)(.*)$/)
        let currency = regexMatchArray[1].trim()
        let price = string2Number(regexMatchArray[2], decimalSeparator=decimalSeparator)
        return {currency:currency, price:price}
    } catch(err){
        return null
    }

}


module.exports = {string2Number, parsePrice}
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
 * @returns {Array} currency and value
 */
function currency2Number(string, decimalSeparator='.') {
    try{
        let regexMatchArray = string.trim().match(/^(\D*\$\D*)(.*)$/)
        let currency = regexMatchArray[1].trim()
        let value = string2Number(regexMatchArray[2], decimalSeparator=decimalSeparator)
        return [currency, value]
    } catch(err){
        return [null, null]
    }

}


module.exports = {string2Number, currency2Number}
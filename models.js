
/**
 * Represents a product (Meli or Competitor)
 */
function Product() {
    let product = {};
    product.id = null;
    product.data = {};
    product.data.url = null
    product.data.image = null
    product.data.price = null
    product.data.currency = null
    product.data.title = null
    product.data.features = []
    product.data.reviews_rate = null
    product.data.reviews_number = null
    return product
}

/**
 * Extends Product
 * Represents a competitor´s product
 */
function ProductComp() {
    let product = Product()
    product.rival_site = null;
    return product
}

module.exports = {ProductComp};
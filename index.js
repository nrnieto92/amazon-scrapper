const AmzScrapper = require('./crawlers/CrawlerAMB').CrawlerAMB;

//const url = 'https://www.amazon.com.br/Apple-MacBook-Pro-Chip-256GB/dp/B08R3WWHYG/ref=sr_1_6?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=mac&qid=1625183539&sr=8-6';
const url = 'https://www.amazon.com.br/dp/B07L63C2VT'

/**
 * Simple example of a basic Amazon's scrapper usage
 */
async function main(url, callback) {

    //Get product data for a given url
    let amzScrapper = new AmzScrapper();
    let id;
    let product_data;

    try {
        id = amzScrapper.getIdFromUrl(url);
        product_data = await amzScrapper.getProductData(id);
    } catch (err) {
        throw err;
    }

    return callback(product_data);
}


main(url, function (product_data) {
    console.log(JSON.stringify(product_data));
});



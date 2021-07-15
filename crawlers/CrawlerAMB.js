const cheerio = require('cheerio');
const {priceparser} = require('../utils');
const {ProductComp} = require('../models');
const {Crawler} = require('./Crawler.js');

const PRODUCT_PAGE_BASE_URL = 'https://www.amazon.com.br/dp/'

/**
 * Extends Crawler parent class
 */
class CrawlerAMB extends Crawler {

  /**
   * Creates a Crawler for Amazon Brasil
   * @param {*} args
   * @param {String} rival_id
   * 
   */
  constructor (args) {
    super({...args, rival_id: 'AMB'});
  }

  /**
   * Makes GET request and parses product details
   * @param {String} id 
   * @returns {Object} Product object
   */
  async _getProductData(id) {

    let url = `${PRODUCT_PAGE_BASE_URL}${id}`

    let response = await this.request(url);

    let body = response.data;

    if (!body) throw Error('Request Error')

    try {

      let product = this.parseProductDetails(id, body)
      return product
      
    }
    catch (err) {
      throw err;
    }

  }

  /**
   * Parses item id from url
   * Returns item id given an item url
   * 
   * @param {String} item url
   * 
   * @return {String} Item id  
   * 
   **/
   _getIdFromUrl(url){
    try{
      let comp_id = url.match('(?:[/dp/]|$)([A-Z0-9]{10})').map(a=>a.replace('/', ''))[0];
      return comp_id;
    } catch(err){
        throw err;
      }
    }

/**
 * Parses product detail page html
 * and returns product object
 * 
 * @param {String} id Item id
 * @param {String} body Request body
 * 
 * @returns {Object} product Product data
 */
  parseProductDetails(id, body){

    const $ = cheerio.load(body)

    // Title
    let title = $('#productTitle').text().trim();


    // Price
    let currency, price;
    let raw_price = $('#price_inside_buybox').text().trim() || $('#priceblock_ourprice').text().trim()
    if(!raw_price){
        raw_price = $('.a-color-price').first().text().trim()
    }

    let parsedPrice = priceparser.parsePrice(raw_price, ',')

    if(!title || !parsedPrice || !parsedPrice.price || !parsedPrice.currency){
      throw Error('Error parsing product item page');
    }

    let feats = []

    // Features (Sobre este item)
    $('#feature-bullets').find("span").each(function(index, element){
        feats.push($(element).text().trim())
    })


    // Reviews
    let reviews_rate = Number($('.reviewCountTextLinkedHistogram').first().text().trim().replace(' de 5 estrelas', '').replace(',', '.'))
    let reviews_number = Number($('#acrCustomerReviewText').first().text().replace(' classificações', '').replace('.', ''));

    // Classic image
    let image = $('#imgTagWrapperId > img').attr('data-old-hires')
    if(!image){
        try{
            // Lower quality image
            let images = JSON.parse($('[data-a-dynamic-image]').first().attr("data-a-dynamic-image"))
            image = Object.keys(images)[0]
        }
        catch(e){
            console.log(`No image available for id ${id}`);
        }
    }

    // Build product object
    let product = ProductComp();
    product.id = id
    product.data.url = `${PRODUCT_PAGE_BASE_URL}${id}`

    product.data.price = parsedPrice.price
    product.data.currency = parsedPrice.currency

    product.data.image = image
    product.data.title = title

    product.data.reviews_rate = reviews_rate;
    product.data.reviews_number = reviews_number;

    product.data.features = feats 

    product.rival_site = 'AMB'

    if(id){
        return product
    } else {
        return null
    }

  }
}


module.exports = {
  CrawlerAMB,
}
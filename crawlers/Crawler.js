const request = require('axios');

/**
 * Crawler parent class
 */
class Crawler {

  /**
   * Creates Crawler
   * Normally each site would have a particular proxy settings
   * @param {*} options 
   */
  constructor(options) {
    this.rival_id = options.rival_id || 'CRAWLER';
    this.request = request
  }

  async _getProductData(id) {
    return {};
   }


  _getIdFromUrl(url) {
    return 'DUMMY_ID';
  }

  async getProductData(id) {
    try {
      const results = await this._getProductData(id);
      return results;
    } catch (error) {
      throw error
    }
  }

  getIdFromUrl(url) {
    try{
      return this._getIdFromUrl(url);
    } catch(err){
      throw Error('Error parsing id from url');
    }
  }
}


module.exports = {
  Crawler,
};
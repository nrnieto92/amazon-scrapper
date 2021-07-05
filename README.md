# Amazon Brazil Scrapper
Simple Amazon Brazil's product detail page scrapper


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This is a simple Amazon Brazil product detail scrapper.  
It basically parses the product detail page's html and provides data like item's title, price, reviews, features, etc.
    
It also features a simple usage example at root's index.js
	
## Technologies
Project is created with:
* **cheerio**: 1.0.0-rc.10
* **axios**: 0.21.1
* **jest**: 27.0.6
* **chai**: 4.3.4
	
## Setup
To run scrapper locally using npm:

```
$ npm install
$ npm start
```

## Testing
Project features a *test_sources* directory where htmls are stored for testing purposes.
    
For testing simply run:

```
$ npm test
```
const { request } = require("express");
const fetch = require('node-fetch');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getStocks = async (req, res) => {
    const options = {
        url: 'https://finnhub.io/api/v1/stock/symbol?exchange=US',
        headers: {
          'X-Finnhub-Token': 'cf7qk6iad3iad4t66pk0cf7qk6iad3iad4t66pkg' // Replace with your API token
        }
    };

    // fetch("https://query1.finance.yahoo.com/v7/finance/quote?symbols=BRPHF")
    // .then(response => response.json())
    // .then(json => {
    //   res.send(json);
    // })
    // .catch(err => console.error(err));

    fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cf7qk6iad3iad4t66pk0cf7qk6iad3iad4t66pkg`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    res.send(data);
  })
  .catch(error => {
    console.error(error);
  });

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getGLXStock = async (req, res) => {
  fetch("https://query1.finance.yahoo.com/v7/finance/quote?symbols=BRPHF")
  .then(response => response.json())
  .then(json => {
    res.send(json);
  })
  .catch(err => console.error(err));

};

module.exports = {getStocks, getGLXStock};
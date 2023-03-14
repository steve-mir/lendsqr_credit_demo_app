const { request } = require("express");

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

    request(options, (error, response, body) => {
        if (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        } else {
          // Return the response to the client
          res.writeHead(200, {"Content-Type": "application/json"});
          res.status(200).send(body);
          res.send(body);
        }
    });
};

module.exports = {getStocks};
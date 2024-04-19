const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * This funds the users wallet.
 * no payment gateway was implemented
 * @param {*} req 
 * @param {*} res 
 */
const downloadZippedFile = async (req, res) => {
    try {
        // if (req.url === '/download') {
            const filePath = path.join(__dirname, '../../../../docs/Bithumb.zip'); // Update the path to your zip file
    
            // fs.readFile(filePath, (err, data) => {
            //     if (err) {
            //         res.writeHead(404, {'Content-Type': 'text/plain'});
            //         res.end('Error: File not found');
            //     } else {
            //         res.setHeader('Content-disposition', 'attachment; filename=Bithumb.zip');
            //         res.setHeader('Content-Type', 'application/zip');
            //         res.end(data);
            //     }
            // });
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Error: File not found');
                } else {
                    res.setHeader('Content-disposition', 'attachment; filename=Bithumb.zip');
                    res.setHeader('Content-Type', 'application/octet-stream'); // Set the correct Content-Type for zip files
                    res.end(data);
                }
            });

        // } else {
        //     res.writeHead(404, {'Content-Type': 'text/plain'});
        //     res.end('Error: Endpoint not found');
        // }


        // Send the response back to the client
        // res.status(200).json(response);
    } catch (err) {
        console.log("Download error", err);
        // console.log(err.code);
        // console.log(err.response.body);
    }
};

module.exports = {downloadZippedFile};

const cors = require("cors");
const express = require("express");
const { getStocks } = require("../controllers/stocks");



const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.get("/stocks", getStocks);

module.exports = router;

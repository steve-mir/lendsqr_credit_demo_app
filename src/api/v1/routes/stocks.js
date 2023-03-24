const cors = require("cors");
const express = require("express");
const { getStocks, getGLXStock } = require("../controllers/stocks");



const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.get("/stocks", getStocks);
router.get("/stocks/glx", getGLXStock);

module.exports = router;

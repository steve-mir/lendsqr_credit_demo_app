const cors = require("cors");
const express = require("express");
const { performInvestment } = require("../controllers/investment");



const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.post("/invest", performInvestment);

module.exports = router;

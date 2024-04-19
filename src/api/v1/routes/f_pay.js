const cors = require("cors");
const express = require("express");
const { generatePaymentLink } = require("../controllers/f_pay");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.post("/payment/link", generatePaymentLink);
// router.get("/deposit", validateToken, getUserDeposits);

module.exports = router;

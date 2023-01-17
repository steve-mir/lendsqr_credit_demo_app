const cors = require("cors");
const express = require("express");
const { getUserTransactions } = require("../controllers/transaction");
const { validateToken } = require("../middleware/jwt");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.get("/transactions", validateToken, getUserTransactions);

module.exports = router;

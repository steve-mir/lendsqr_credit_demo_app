const cors = require("cors");
const express = require("express");
const { createNewWallet } = require("../controllers/wallet");
const { validateToken } = require("../middleware/jwt");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.post("/wallets/create", validateToken, createNewWallet);

module.exports = router;

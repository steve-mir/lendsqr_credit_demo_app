const cors = require("cors");
const express = require("express");
const { createNewWallet, getUserWallets } = require("../controllers/wallet");
const { validateToken } = require("../middleware/jwt");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.post("/wallets/create", validateToken, createNewWallet);
router.get("/wallets", validateToken, getUserWallets);

module.exports = router;

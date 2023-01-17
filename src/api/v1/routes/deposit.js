const cors = require("cors");
const express = require("express");
const { fundWallet, getUserDeposits } = require("../controllers/deposit");
const { validateToken } = require("../middleware/jwt");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.post("/deposit", validateToken, fundWallet);
router.get("/deposit", validateToken, getUserDeposits);

module.exports = router;

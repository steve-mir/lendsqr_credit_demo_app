const cors = require("cors");
const express = require("express");

const { internalWithdrawal, externalWithdrawal, getUserWithdrawals } = require("../controllers/withdrawals");
const { validateToken } = require("../middleware/jwt");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.post("/withdraw", validateToken, internalWithdrawal);
router.post("/withdraw/bank", validateToken, externalWithdrawal);
router.get("/withdraw", validateToken, getUserWithdrawals);

module.exports = router;

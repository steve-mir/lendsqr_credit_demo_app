const cors = require("cors");
const express = require("express");
const emailSender = require("../controllers/email");
const app = express();
app.use(cors( {origin: true} ));

// eslint-disable-next-line new-cap
const router = express.Router();

// Create profile
router.post("/email", emailSender);

module.exports = router;
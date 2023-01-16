const cors = require("cors");
const express = require("express");
const { registerUser } = require("../controllers/users");
const validateEmailAndPassword = require("../middleware/validateEmailPassword");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

// Create new user
router.post("/users/register", validateEmailAndPassword, registerUser);

module.exports = router;

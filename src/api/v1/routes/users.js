const cors = require("cors");
const express = require("express");
const { registerUser, loginUser, userProfile, getCurrentUser, updateUserProfile, getUsers, logout } = require("../controllers/users");
const { validateToken } = require("../middleware/jwt");
const validateEmailAndPassword = require("../middleware/validateEmailPassword");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

// Create new user
router.post("/users/register", validateEmailAndPassword, registerUser);
router.post("/users/login", validateEmailAndPassword, loginUser);
router.get("/users", validateToken, getUsers);
router.get("/users/profile", validateToken, getCurrentUser);
router.patch("/users/profile", validateToken, updateUserProfile);
router.get("/user/logout", logout);

module.exports = router;

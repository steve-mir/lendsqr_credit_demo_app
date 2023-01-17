const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const errors = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require('dotenv');
// const knexConfig = require("./config/db/knexfile");

const userRoutes = require("./src/api/v1/routes/users");
const walletRoutes = require("./src/api/v1/routes/wallet");
const depositRoutes = require("./src/api/v1/routes/deposit");
const transactionsRoutes = require("./src/api/v1/routes/transaction");

dotenv.config()
const PORT = 2000;
const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/", walletRoutes);
app.use("/", depositRoutes);
app.use("/", transactionsRoutes);

app.get("/home", async (req, res) => {
  return res.status(200).send(`Welcome home. Running on port ${PORT}`);
});

// Remove or comment this function while running locally
app.listen(PORT, ()=> {
  console.log(`App is running on port ${PORT}`);
});


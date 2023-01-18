const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const errors = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require('dotenv');


const userRoutes = require("./src/api/v1/routes/users");
const walletRoutes = require("./src/api/v1/routes/wallet");
const depositRoutes = require("./src/api/v1/routes/deposit");
const withdrawalRoutes = require("./src/api/v1/routes/withdrawals");
const transactionsRoutes = require("./src/api/v1/routes/transaction");

dotenv.config()
const PORT = 2001;
const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/", walletRoutes);
app.use("/", depositRoutes);
app.use("/", withdrawalRoutes);
app.use("/", transactionsRoutes);

app.get("/home", async (req, res) => {
  return res.status(200).send(`Welcome home. Running on port ${PORT}`);
});

app.listen(PORT, ()=> {
  console.log(`App is running on port ${PORT}`);
});

module.exports = app;


const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const errors = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require('dotenv');
const knexConfig = require("./config/db/knexfile");

const userRoutes = require("./src/api/v1/routes/users");

dotenv.config()
const PORT = 2000;
const app = express();

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", userRoutes);

app.get("/home", async (req, res) => {
  return res.status(200).send(`Welcome home. Running on port ${PORT}`);
});

// Remove or comment this function while running locally
app.listen(PORT, ()=> {
  console.log(`App is running on port ${PORT}`);
});


const cors = require("cors");
const express = require("express");
const { downloadZippedFile } = require("../controllers/download_file");


const app = express();
app.use(cors( {origin: true} ));

const router = express.Router();

router.get("/download/bithumb", downloadZippedFile);

module.exports = router;
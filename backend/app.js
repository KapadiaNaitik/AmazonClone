require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
require("./database/connection.js");
const cookieParser = require("cookie-parser");
const Products = require("./models/productSchema");
// const DefaultData=require("./defaultdata")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(router);
app.use(cookieParser());
app.use(express.json);
const port = 7803;
app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
// DefaultData();

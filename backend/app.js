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
// app.use(cors());
// app.options("*", cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(router);
app.use(express.json);
const port = 7803;
app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
// DefaultData();

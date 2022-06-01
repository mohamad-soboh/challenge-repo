//bring in express
const express = require("express");
const res = require("express/lib/response");
//use express router
const customerRoute = require("../../api/customerRoute");

//for proxy
const cors = require("cors");
const app = express();


app.use(
  cors({
    origin: "*",
  })
);

app.use(customerRoute);


module.exports = app;

//bring in express
const express = require("express");
const res = require("express/lib/response");
//use express router
const router = express.Router();
//using axios
const axios = require('axios');
//for proxy
const cors = require("cors");
router.use(
  cors({
    origin: "*",
  })
);


//@route  GET api/users
//@desc   validate mobile  number
//@acess  Public/
router.get("/validate", (req, res) => {

//validating  the form
  const validate = (mobile)=>
  axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${mobile}`)
  .then((response) => console.log(response));

  });

  
//export all the routers
module.exports = router;
//bring in express
const express = require("express");
const res = require("express/lib/response");
//use express router
const router = express.Router();


//@route  GET api/users
//@desc   Test route
//@acess  Public
router.get('/', (req, res) => res.send('User route'));



//export all the routers
module.exports =router;
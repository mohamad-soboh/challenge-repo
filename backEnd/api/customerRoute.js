//bring in express
const express = require("express");
//importing customer controller
//importing customer controller
const customerController =require('../api/customerController')
//for proxy
const cors = require("cors");
router.use(
  cors({
    origin: "*",
  })
);
//use express router
const router = express.Router();



//@route  GET api/users
//@desc   Get All Customers
//@acess  Public/
router.get("/AllCustomers",customerController.customer_index);


//@route  POST api/users
//@desc   Add a Customer
//@acess  Public
router.post("/Addcustomer",customerController.customer_create);


//@route  PATCH api/users
//@desc   Update a Customer
//@acess  Public/
router.patch("/update/:id",customerController.customer_update);


//@route  DELETE api/users
//@desc   Delete a Customer
//@acess  Public/
router.delete("/DeleteCustomer/:id",customerController.customer_delete);




//export all the routers
module.exports = router;
//bring in express
const express = require("express");
const res = require("express/lib/response");
//use express router
const router = express.Router();
//loading the customer model
require("../../models/Customer");
const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
//for proxy
const cors = require("cors");
router.use(
  cors({
    origin: "*",
  })
);
//@route  GET api/users
//@desc   Get All Customers
//@acess  Public/
router.get("/AllCustomers", (req, res) => {
  // res.send('User route');
  Customer.find()
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
});

//@route  DELETE api/users
//@desc   Delete a Customer
//@acess  Public/
router.delete("/DeleteCustomer/:id", (req, res) => {
  Customer.findOneAndRemove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            messsage: "Deleted with success !",
        });
    })
    .catch((err) => {
        console.log(err.response.data);
        });
});

//@route  POST api/users
//@desc   Add a Customer
//@acess  Public/
router.post("/Addcustomer", (req, res) => {
  var newCustomer = {
    customer_name: req.body.fullName,
    customer_adress: req.body.adress,
    customer_mobile_number: req.body.mobileNumber,
  };
  //create  a new customer with those attribute that we recieved
  var customer = new Customer(newCustomer);
  customer.save().then(() => {
    console.log(" customer created!");
    console.log(customer);
    Customer.find()
      .then((customers) => {
        res.send("customer created with success !");
      })
      .catch((err) => {
        res.status(500).json({
          error: "phone number already belong to another user",
        });
      });
  });
});

//@route  PATCH api/users
//@desc   Update a Customer
//@acess  Public/
router.patch("/update/:id", (req, res) => {
    Customer.findOneAndUpdate(
      { _id: req.params.id },
      {
        customer_name: req.body.customer_name,
        customer_adress: req.body.customer_adress,
        customer_mobile_number: req.body.customer_mobile_number,
      }
    )
      .then(() => {
        console.log(req.body);
        res.send("customer updated with success !");
      })
      .catch((err) => {
        throw err;
      });
  });

//export all the routers
module.exports = router;

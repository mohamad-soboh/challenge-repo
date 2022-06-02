//loading the customer model
require("../models/Customer");
const mongoose = require("mongoose");
const Customer = mongoose.model("customer");

const customer_index = (req, res) => {
    Customer.find()
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

const customer_create = (req, res) => {
    var newCustomer = {
        customer_name: req.body.customer_name,
        customer_adress: req.body.customer_adress,
        customer_mobile_number: req.body.customer_mobile_number,
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
};

const customer_update =(req,res)=>{
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
}
const customer_delete= (req,res)=>{
    Customer.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        messsage: "Deleted with success !",
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

module.exports = {
  customer_index,
  customer_create,
  customer_update,
  customer_delete
};

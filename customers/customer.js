//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//load mangoose
const mongoose = require("mongoose");

//loading the customer model
require("./customerModel");
const Customer = mongoose.model("customer");

//connecting to mangodb
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.qhek7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("Database Connected");
  }
);
app.get("/", (req, res) => {
  res.send("api running !");
});

app.listen(4545, () => {
  console.log("server started ! ");
});


//Add Customer API
app.post("/customer", (req, res) => {
  var newCustomer = {
    customer_name: req.body.name,
    customer_adress: req.body.adress,
    customer_mobile_number: req.body.mb,
  };
  //create  a new customer with those attribute that we recieved
  var customer = new Customer(newCustomer);
  customer
    .save()
    .then(() => {
      console.log(" customer created!");
      console.log(customer);
    })
    .catch((err) => {
      throw err;
    });
  res.send(" a new customer has been created with successs");
});


//Get all customers API
app.get("/allcustomer", (req, res) => {
    Customer.find().then((customers) => {
      res.json(customers)}).catch((err) => {
          throw err;
        });
  });
  

//Delete customer api


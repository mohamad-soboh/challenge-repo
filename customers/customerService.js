//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//load mangoose
const mongoose = require("mongoose");
const res = require("express/lib/response");

//loading the customer model
require("./customerModel");
const Customer = mongoose.model("customer");

//loading the mobilevalidation model
require("../mobile_validation/mobileValidationModel");
const Mobile = mongoose.model("mobile");

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
app.post("/Addcustomer", (req, res) => {
fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${req.body.mb}`)
.then(data => {
return data.json();
})
.then(post => {
  var new_mobile_validity = {
    mobile_country_code: post.country.prefix,
    mobile_country_name: post.country.name,
    mobile_operator_name: post.carrier,
    mobile_number: post.phone,
    mobile_validity:post.valid
  }
console.log(new_mobile_validity);
console.log(post);

});
  var newCustomer = {
    customer_name: req.body.name,
    customer_adress: req.body.adress,
    customer_mobile_number: req.body.mb,
  };
  //create  a new customer with those attribute that we recieved
  if(mobile_validity == true)
  {var customer = new Customer(newCustomer);
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
}
else{
  res.send(" invalid phone number");
}
});

//Get all customers API
app.get("/AllCustomers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      throw err;
    });
});

//Delete customer api
app.delete("/DeleteCustomer/:id", (req, res) => {
  Customer.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.send("book removed with success !");
    })
    .catch((err) => {
      throw err;
    });
});

//Update customer api
app.patch("/update/:id", (req, res) => {
  Customer.findOneAndUpdate({ _id: req.params.id },
    {customer_name:req.body.customer_name,
      customer_adress:req.body.customer_adress,
      customer_mobile_number:req.body.customer_mobile_number
    })
    .then(() => {
      console.log(req.body);
      res.send("book updated with success !");
    })
    .catch((err) => {
      throw err;
    });
});

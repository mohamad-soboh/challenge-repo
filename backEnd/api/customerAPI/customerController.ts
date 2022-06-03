//loading the customer model
// require("../../models/Customer");
import mongoose from 'mongoose';
const Customer = mongoose.model("customer");
import mobileService from "../mobileValidationAPI/mobileValidationController";
const customer_index = (req, res) => {
  Customer.find()
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

const customer_create = async (req, res) => {
  var newCustomer = {
    customer_name: req.body.customer_name,
    customer_adress: req.body.customer_adress,
    customer_mobile_number: req.body.customer_mobile_number,
  };
  const ans = await mobileService.mobile_validate(newCustomer.customer_mobile_number);
  //create  a new customer with those attribute that we recieved
  console.log(ans);

const mobileCounter =await Customer.find({customer_mobile_number:req.body.customer_mobile_number})

  if (ans.valid && mobileCounter.length==0) {
    var customer = new Customer(newCustomer);
    customer.save();
    console.log(" customer created!");
    const objectToReturn = { status: 'customer created with success !',
    valid: ans.valid,
    operatorName: ans.carrier,
    countryCode: ans.country.prefix,
    countryName: ans.country.name,
}
    res.statusCode = 201;
    res.send(objectToReturn)

    console.log(customer);

  }
  else
    {
      res.send({ status: 'customer not created  !',
      valid: ans.valid,
});
    }
};

const customer_update = (req, res) => {
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
};
const customer_delete = (req, res) => {
  Customer.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        messsage: "Deleted with success !",
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default {
  customer_index,
  customer_create,
  customer_update,
  customer_delete,};


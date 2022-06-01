const mongoose = require("mongoose");

//A model is a ref to our collection inside the db
//creating attributes for our customer
//customer_name customer_adress customer_mobile_number

const CustomerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    require: true,
  },
  customer_adress: {
    type: String,
    require: true,
  },
  customer_mobile_number: {
    type: Number,
    require: true,
    unique: false,
  },
});
//Cutomer is a varaible that we store in the model
///mongo.model('modelname, schemaname')
module.exports = Customer = mongoose.model("customer", CustomerSchema);

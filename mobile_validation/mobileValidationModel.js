const mongoose =require("mongoose");

//A model is a ref to our collection inside the db

mongoose.model("mobile",{
//creating attributes for our customer
//countryCode countryName  operatorName 

mobile_country_code:{
    type: String,
},
mobile_country_name:{
    type: String,
},
mobile_operator_name:{
    type: String,
},
mobile_number:{
    type: Number,
},
mobile_validity:{
    type: Boolean,
     default: false
}

});
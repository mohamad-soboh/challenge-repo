const mongoose =require("mongoose");

//A model is a ref to our collection inside the db

mongoose.model("customer",{
//creating attributes for our customer
//customer_name customer_adress customer_mobile_number

customer_name:{
    type: String,
    require:true
},
customer_adress:{
    type: String,
    require:true
},
customer_mobile_number:{
    type: Number,
    require:true
}
});
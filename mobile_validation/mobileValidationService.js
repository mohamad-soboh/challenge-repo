//load express
const express =require('express');
const app = express();

//load mangoose
const mongoose =require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.qhek7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    console.log("Database Connected")
});
app.get('/',(req,res)=>{
    res.send("api running !")});

app.listen(4545,()=> {
    console.log("server started ! ");
});

//loading the customer model
require("./mobileValidationModel");
const Mobile = mongoose.model("mobile");


// fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${req.body.mb}`)
// .then(data => {
// return data.json();
// })
// .then(post => {
// console.log(post);
// });


// fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${req.body.customer_mobile_number}`)
// .then(data => {
// return data.json();
// })
// .then(post => {
//   var new_mobile_validity = {
//     mobile_country_code: post.country.prefix,
//     mobile_country_name: post.country.name,
//     mobile_operator_name: post.carrier,
//     mobile_number: post.phone,
//     mobile_validity:post.valid
//   }
// console.log(new_mobile_validity);
// console.log(post);

// });
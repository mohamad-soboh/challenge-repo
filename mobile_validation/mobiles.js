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

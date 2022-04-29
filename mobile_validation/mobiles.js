const express =require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("api running !")});

app.listen(4545,()=> {
    console.log("server started ! ");
});

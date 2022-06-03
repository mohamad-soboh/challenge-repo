const express = require("express");
const connectDb =require('../config/db');
const app = express();
const res = require("express/lib/response");



//Connect DataBase 
connectDb();
//init Middlware
app.use(express.json({extended :false}));

app.get('/',(req,res)=> res.send('API Running'));

// const cors = require('cors');
// app.use(cors({
//     origin:  '*'
// }));

//define Routes 
app.use('/api/customers',require('./api/customerAPI/customerRoute'));


const PORT = process.env.PORT || 4545;

app.listen(4545, () => {
  console.log("server started ! ");
});



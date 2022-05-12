const express = require("express");
const connectDb =require('./config/db');
const app = express();
const bodyParser = require("body-parser");
const res = require("express/lib/response");



//Connect DataBase 
connectDb();

app.get('/',(req,res)=> res.send('API Running'));



//define Routes 
app.use('/api/customers',require('./routes/api/customers'));


const PORT = process.env.PORT || 4545;

app.listen(4545, () => {
  console.log("server started ! ");
});
const cors = require('cors');
app.use(cors({
    origin:  '*'
}));

app.use(bodyParser.json());

import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser"
import router from './api/customerAPI/customerRoute'
const app = express();
import connectDB from "../config/db"


// init Middlware
// app.use(express.json({extended :false}));
connectDB;
app.get('/',(req,res)=> res.send('API Running'));

const cors = require('cors');
app.use(cors({
    origin:  '*'
}));

//define Routes 
app.use('/api/customers',router);


const PORT = process.env.PORT || 8081;

app.listen(4545, () => {
  console.log("server started ! ");
});



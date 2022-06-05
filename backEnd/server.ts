import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser"
import connect from "../config/db";
import customerRouter from './api/customerAPI/customerRoute'

const app: Application = express();
const port: number = 4545 ;
const db: string = "mongodb+srv://admin:admin@cluster0.qhek7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/customers',customerRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("api running");
});
connect(db);

app.listen(port, () => {
  console.log(`Server running`);
});





///  java script  version 

// import express, { Application, Request, Response, NextFunction } from "express";
// import bodyParser from "body-parser"
// import router from './api/customerAPI/customerRoute'
// const app = express();
// import connectDB from "../config/db"


// // init Middlware
// // app.use(express.json({extended :false}));
// connectDB;
// app.get('/',(req,res)=> res.send('API Running'));

// const cors = require('cors');
// app.use(cors({
//     origin:  '*'
// }));

// //define Routes 
// app.use('/api/customers',router);


// const PORT = process.env.PORT || 8081;

// app.listen(4545, () => {
//   console.log("server started ! ");
// });
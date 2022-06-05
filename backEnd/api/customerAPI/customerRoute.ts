//bring in express
import  express from "express";
//importing customer controller
import  customerController from './customerController';
//for proxy
import  cors from 'cors';



const customerRouter = express.Router();
customerRouter.use(
  cors({
    origin: "*",
  })
);



//@route  GET api/users
//@desc   Get All Customers
//@acess  Public/
customerRouter.get("/AllCustomers",customerController.customer_index);


//@route  POST api/users
//@desc   Add a Customer
//@acess  Public
customerRouter.post("/Addcustomer",customerController.customer_create);


//@route  PATCH api/users
//@desc   Update a Customer
//@acess  Public/
customerRouter.patch("/update/:id",customerController.customer_update);


//@route  DELETE api/users
//@desc   Delete a Customer
//@acess  Public/
customerRouter.delete("/DeleteCustomer/:id",customerController.customer_delete);




//export all the routers
export default customerRouter;

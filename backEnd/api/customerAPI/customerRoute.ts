//bring in express
import  express from "express";
//importing customer controller
import  customerController from './customerController';
//for proxy
import  cors from 'cors';



const router = express.Router();
router.use(
  cors({
    origin: "*",
  })
);



   
  





//@route  GET api/users
//@desc   Get All Customers
//@acess  Public/
router.get("/AllCustomers",customerController.customer_index);


//@route  POST api/users
//@desc   Add a Customer
//@acess  Public
router.post("/Addcustomer",customerController.customer_create);


//@route  PATCH api/users
//@desc   Update a Customer
//@acess  Public/
router.patch("/update/:id",customerController.customer_update);


//@route  DELETE api/users
//@desc   Delete a Customer
//@acess  Public/
router.delete("/DeleteCustomer/:id",customerController.customer_delete);




//export all the routers
export default router;

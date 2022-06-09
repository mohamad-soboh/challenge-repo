//loading the customer model
require("../../models/Customer");
import mobileService from "../mobileValidationAPI/mobileValidationController";
import Customer from "../../models/Customer";
import { Request, Response } from "express";



export const customer_index = (req:Request, res:Response) => {
  Customer.find()
    .then((customers) => {
      res.status(201).json(customers);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.status(400).json(err);
    });
};

export const customer_create = async (req:Request, res:Response) => {
 try{
  var newCustomer = {
    customer_name: req.body.customer_name,
    customer_adress: req.body.customer_adress,
    customer_mobile_number: req.body.customer_mobile_number,
  };
  console.log(req.body);
  const ans = await mobileService.mobile_validate(newCustomer.customer_mobile_number);
  //create  a new customer with those attribute that we recieved
  console.log(ans);

const mobileCounter =await Customer.find({customer_mobile_number:req.body.customer_mobile_number})
  if(ans.valid==false)
  res.status(471).json('invalid phone number..dont forget to add prefix');
  if(mobileCounter.length !=0)
  res.status(470).json(' phone number already exists');
  if (ans.valid && mobileCounter.length==0) {
    var customer = new Customer(newCustomer);
    customer.save();
    console.log(" customer created!");
    const objectToReturn = { status: 'customer created with success !',
    newCustomer,
    valid: ans.valid,
    operatorName: ans.carrier,
    countryCode: ans.country.prefix,
    countryName: ans.country.name,
}
    res.statusCode = 201;
    res.send({
      objectToReturn})

    console.log(customer);

  }
  }
  catch{
    res.status(422).json('number of third party apis calls haa finished  ');

  }
};

const customer_update = async (req: Request, res: Response) => {
  if(req.params.id.length >12 )
  res.status(470).json('id must be 12-byte binary value, represented as a 24 character hex string.');
  
  const ans = await Customer.findOne( { _id: req.params.id })
  const validate = await mobileService.mobile_validate(req.body.customer_mobile_number);

  if(ans  ==null)
  res.status(402).json('customer id not found ');
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    {
      customer_name: req.body.customer_name,
      customer_adress: req.body.customer_adress,
      customer_mobile_number: req.body.customer_mobile_number,
    }
  )
    .then(() => {
      console.log(req.body);
      res.status(201).json('customer updated with success !');

    })
    .catch((err) => {
      console.log(err);
    });
};
const customer_delete = async(req: Request, res: Response) => {
  Customer.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(201).json({
        messsage: "Deleted with success !",
      });
    })
    .catch((err) => {
      res.status(402).json(err);
    });
};

export default {
  customer_index,
  customer_create,
  customer_update,
  customer_delete,};


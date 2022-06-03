// import mongoose from 'mongoose' // js syntax
//importing mongoose using ts syntax
import mongoose ,{  Schema, Document } from "mongoose";
//A model is a ref to our collection inside the db
//creating attributes for our customer
//customer_name customer_adress customer_mobile_number

// interface CustomerInterface extends Document {
 export interface CustomerInterface extends Document {

  customer_name: string;
  customer_adress: string;
  customer_mobile_number: Number;
}

const CustomerSchema: Schema = new Schema({
  customer_name: { type: String, required: true },
  customer_adress: { type: String, required: true },
  customer_mobile_number: { type: String, required: true },
});

//Cutomer is a varaible that we store in the model
///mongo.model('modelname, schemaname')
const Customer = mongoose.model<CustomerInterface>("User", CustomerSchema);

export default Customer;
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import createCustomer from '/Users/mohamadsoboh/ReactNativeProjects/challenge-repo/client/src/createCustomerView.js';
import { Customer_List } from './Customer_List';

export default function App() {
const[customers,setCustomers]=useState([]);
//storing the  form values as an obj in single state hook
const[addFormData,setAddFormData]=useState({
  fullName:"",
  adress:"",
  mobileNumber:"",
});
//state to handle form erros
const[formErrors,setFormErrors]=useState({});

//validating  the form
const validate =(values) =>{
 const errors ={}
const username_regex =/^[A-Za-z]+$/;

}

  //using a handler to update the form values 
const handleAddFormChange =(event)=>{
  console.log(event.target.value);
  const fieldName =event.target.getAttribute('name')
  const fieldValue =event.target.value;

  const fullname=event.target.getAttribute('name=fullName')
console.log(fullname);
//making a cope from the exisit form data so we can mutate it 
  const newFormData ={...addFormData};

  //update the obj with the new value the user has tiped
 newFormData[fieldName]=fieldValue;
 const filter =newFormData.fullName.replace(/[^a-z]/gi, '');
console.log(filter);
 setAddFormData(newFormData);
 console.log(addFormData);
 
}
 useEffect(() => {
  GetAllCustomers();
 }, [customers]) ;
 

    // Requesting GET All Customer Api
const GetAllCustomers = () => {
    axios.get('http://localhost:4545/AllCustomers')
        .then((response) => setCustomers([...response.data]));  
      //  if (!response.ok) {
      //     throw new Error("Something went wrong!");
      //   }
      }

//creating a customer using Add Customer Api
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(
    {  
      "fullName": addFormData.fullName,
      "adress": addFormData.adress,
      "mobileNumber":addFormData.mobileNumber
    })
};
const onCreateCustomer  = () => {
  setFormErrors(validate(addFormData));
  fetch('http://localhost:4545/Addcustomer',requestOptions)
      .then((response) => 
      console.log(response)
      );

        }


 return (
    <div style={{marginTop:"15px"}}>
   <table>
     <thead>
       <tr>
       <th style={{textAlign:'center'}}>No.</th>
         <th style={{textAlign:'center'}}>name</th>
         <th style={{textAlign:'center'}}>Adress</th>
         <th style={{textAlign:'center'}}>Mobile</th>
         <th style={{textAlign:'center'}}>actions</th>
      </tr>
     </thead>
     <tbody>
       {customers.map((customer,index)=>{
         return(
           <tr key={customer._id}>
             <th style={{textAlign:'center'}} scrope="row">{index+1}</th>
             <td style={{textAlign:'center'}}>{customer.customer_name}</td>
             <td style={{textAlign:'center'}}>{customer.customer_adress}</td>
             <td style={{textAlign:'center'}}>{customer.customer_mobile_number}</td>
             <td><button>Delete</button><button>Update</button></td>
           </tr>
         )
       })}
     </tbody>
   </table>
   <h3>Add a Customer</h3>
   <form >
     <input 
     type="text" 
     name ="fullName"
     value={addFormData.fullName.replace(/[^a-z\s]/gi, '')}
     required="reuired"
     placeholder="Enter name"
     onKeyPress={event => (event.key >= 65 && event.key <= 90) || (event.key >= 97 && event.key <= 122)}
     onChange={handleAddFormChange}
     ></input>
      <input 
     type="text" 
     name ="adress"
     required="reuired"
     placeholder="Enter an adress"
     onChange={handleAddFormChange}
     ></input>
      <input 
     type="text"
     name ="mobileNumber"
     required="reuired"
     placeholder="Enter mobile number"
     value={addFormData.mobileNumber.replace(/[^0-9]/, '')}
     onChange={handleAddFormChange}
     ></input>
     <button type='submit' onClick={onCreateCustomer} >Add</button>
   </form>
    </div>
  )
}


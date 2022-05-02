import React,{useState,useEffect} from 'react'
import axios from 'axios';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import createCustomer from '/Users/mohamadsoboh/ReactNativeProjects/challenge-repo/client/src/createCustomerView.js';
import { Customer_List } from './Customer_List';

export default function App() {
const[customers,setCustomers]=useState([]);

 useEffect(() => {
  GetAllCustomers();
 }, []) ;
 useEffect(() => {
  console.log(customers);
}, [customers])
const GetAllCustomers = () => {
    // Requesting GET All Customer Api
    axios.get('http://localhost:4545/AllCustomers')
        .then((response) => setCustomers([...response.data]));  
      //  if (!response.ok) {
      //     throw new Error("Something went wrong!");
      //   }
      }
 return (
    <div style={{marginTop:"15px"}}>
   <table>
     <thead>
       <tr>
         <th style={{textAlign:'center'}}>name</th>
         <th style={{textAlign:'center'}}>Adress</th>
         <th style={{textAlign:'center'}}>Mobile</th>
         <th style={{textAlign:'center'}}>Validate</th>
      </tr>
     </thead>
     <tbody>
       {customers.map((customer,index)=>{
         return(
           <tr key={customer._id}>
             <th scrope="row">{index+1}</th>
             <td>{customer.customer_name}</td>
             <td>{customer.customer_adress}</td>
             <td>{customer.customer_mobile_number}</td>
           </tr>
         )
       })}
     </tbody>
   </table>
    </div>
  )
}


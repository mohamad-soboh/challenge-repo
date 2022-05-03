import React from 'react'

const ReadOnlyRow = ({customer ,index,onDeleteCustomer})=> {
  return (
      
    <tr key={customer._id}>
    <th style={{textAlign:'center'}} scrope="row">{index+1}</th>
    <td style={{textAlign:'center'}}>{customer.customer_name}</td>
    <td style={{textAlign:'center'}}>{customer.customer_adress}</td>
    <td style={{textAlign:'center'}}>{customer.customer_mobile_number}</td>
    <td><button onClick={()=>onDeleteCustomer(customer._id)}>Delete</button><button>Update</button></td>
  </tr>
  );
};

export default ReadOnlyRow
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createCustomer from "/Users/mohamadsoboh/ReactNativeProjects/challenge-repo/client/src/createCustomerView.js";
import { Customer_List } from "./Customer_List";
import ReadOnlyRow from "./components/ReadOnlyRow";
export default function App() {
  const [customers, setCustomers] = useState([]);
  //storing the  form values as an obj in single state hook
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    adress: "",
    mobileNumber: "",
  });
  //state to handle form erros
  const [updateFormData, setUpdateFormData] = useState({
    fullName: "",
    adress: "",
    mobileNumber: "",
    id:""
  });

  //validating  the form
  const validate = (values) => {
    const errors = {};
    const username_regex = /^[A-Za-z]+$/;
  };

  //using a handler to update the form values
  const handleAddFormChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    //making a cope from the exisit form data so we can mutate it
    const newFormData = { ...addFormData };

    //update the obj with the new value the user has tiped
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
    console.log(addFormData);
  };
  //loading customer data into form and upading the values
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    //making a cope from the exisit form data so we can mutate it
    const newFormData = { ...updateFormData };

    //update the obj with the new value the user has tiped
    newFormData[fieldName] = fieldValue;
    setUpdateFormData(newFormData);
    console.log(updateFormData);
  };
  const handleUpdateCustomerClick = (customer) => {
    
    console.log(customer._id);
    const mobile =customer.customer_mobile_number;
    const formValues = {
      fullName: customer.customer_name,
      adress: customer.customer_adress,
      mobileNumber:customer.customer_mobile_number,
      id:customer._id
    };
    setUpdateFormData(formValues);
    console.log(updateFormData);
  };
  useEffect(() => {
    GetAllCustomers();
  }, [customers]);

  // Requesting GET All Customer Api
  const GetAllCustomers = () => {
    axios
      .get("http://localhost:4545/AllCustomers")
      .then((response) => setCustomers([...response.data]));
    //  if (!response.ok) {
    //     throw new Error("Something went wrong!");
    //   }
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: addFormData.fullName,
      adress: addFormData.adress,
      mobileNumber: addFormData.mobileNumber,
    }),
  };
  const requestUpdateOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer_name: updateFormData.fullName,
      customer_adress: updateFormData.adress,
      customer_mobile_number: updateFormData.mobileNumber,
    }),
  };
  //creating a customer using Add Customer Api
  const onCreateCustomer = () => {
    fetch("http://localhost:4545/Addcustomer", requestOptions).then(
      (response) => console.log(response)
    );
  };
  //Deleting a customer
  const onDeleteCustomer = (customerId) => {
    console.log(customerId);
    axios.delete(`http://localhost:4545/DeleteCustomer/${customerId}`);
  };

  //update a customer
  const onUpdateCustomer = (updateFormData) => {
    fetch(`http://localhost:4545/update/${updateFormData.id}`, requestUpdateOptions).then((response) =>
      console.log(response)
    );
  };
  return (
    <div style={{ marginTop: "15px" }}>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>name</th>
            <th style={{ textAlign: "center" }}>Adress</th>
            <th style={{ textAlign: "center" }}>Mobile</th>
            <th style={{ textAlign: "center" }}>actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            return (
              <tr key={customer._id}>
                <th style={{ textAlign: "center" }} scrope="row">
                  {index + 1}
                </th>
                <td style={{ textAlign: "center" }}>
                  {customer.customer_name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {customer.customer_adress}
                </td>
                <td style={{ textAlign: "center" }}>
                  {customer.customer_mobile_number}
                </td>
                <td>
                  <button onClick={() => onDeleteCustomer(customer._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdateCustomerClick(customer)}>
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3>Add a Customer</h3>
      <form>
        <input
          type="text"
          name="fullName"
          value={addFormData.fullName.replace(/[^a-z\s]/gi, "")}
          required="reuired"
          placeholder="Enter name"
          onChange={handleAddFormChange}
        ></input>
        <input
          type="text"
          name="adress"
          required="reuired"
          placeholder="Enter an adress"
          onChange={handleAddFormChange}
        ></input>
        <input
          type="text"
          name="mobileNumber"
          required="reuired"
          placeholder="Enter mobile number"
          value={addFormData.mobileNumber.replace(/[^0-9]/, "")}
          onChange={handleAddFormChange}
        ></input>
        <button type="submit" onClick={onCreateCustomer}>
        Submit
        </button>
      </form>

      <h3>update Customer</h3>
      <form>
        <input
          type="text"
          name="fullName"
          value={updateFormData.fullName.replace(/[^a-z\s]/gi, "")}
          required="reuired"
          placeholder="Enter name"
          onChange={handleEditFormChange}
        ></input>
        <input
          type="text"
          name="adress"
          required="reuired"
          placeholder="Enter an adress"
          value={updateFormData.adress}
          onChange={handleEditFormChange}
        ></input>
        <input
          type="text"
          name="mobileNumber"
          required="reuired"
          placeholder="Enter mobile number"
          value={updateFormData.mobileNumber.toString().replace(/[^0-9]/, "")}
          onChange={handleEditFormChange}
        ></input>
        <button type="submit" onClick={() => onUpdateCustomer(updateFormData)}>
          Submit
        </button>
      </form>

     
    </div>
  );
}

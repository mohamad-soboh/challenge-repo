import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Formik, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { csonParser } from "config/parser";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [validate, setValidate] = useState({
    valid: "",
    operatorName: "",
    countryCode: "",
    countryName: "",
  });

  const [Deleted, setDeleted] = useState(1);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const forimk = useFormik({
    initialValues: {
      fullName: "",
      adress: "",
      mobileNumber: "",
      valid: null,
      operatorName: "",
      countryCode: "",
      countryName: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      adress: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      mobileNumber: Yup.string()
        .max(15, "Must be 20 characters or less")
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
    }),
    onSubmit: (values) => {
      onCreateCustomer();
    },
  });
  const updatedFormik = useFormik({
    initialValues: {
      fullName: "",
      adress: "",
      mobileNumber: "",
      id: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      adress: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      mobileNumber: Yup.string()
        .max(15, "Must be 20 characters or less")
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
    }),
    onSubmit: () => {
      onUpdateCustomer();
    },
  });
  //should be the formik submit
  const handleUpdateCustomerClick = (customer) => {
    updatedFormik.setFieldValue("fullName", customer.customer_name);
    updatedFormik.setFieldValue("adress", customer.customer_adress);
    updatedFormik.setFieldValue(
      "mobileNumber",
      customer.customer_mobile_number
    );
    updatedFormik.setFieldValue("id", customer._id);
  };
  useEffect(() => {
    GetAllCustomers();
  }, [Deleted]);

  useEffect(() => {
    GetAllCustomers();
    console.log(validate);
    console.log(forimk.values);
  }, [validate]);

  // Requesting GET All Customer Api
  const GetAllCustomers = () => {
    axios
      .get("http://localhost:4545/api/customers/AllCustomers")
      .then((response) => {
        setCustomers([...response.data]);
        console.log(response);
      });
    //  if (!response.ok) {
    //     throw new Error("Something went wrong!");
    //   }
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer_name: forimk.values.fullName,
      customer_adress: forimk.values.adress,
      customer_mobile_number: forimk.values.mobileNumber,
    }),
  };
  const requestUpdateOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer_name: updatedFormik.values.fullName,
      customer_adress: updatedFormik.values.adress,
      customer_mobile_number: updatedFormik.values.mobileNumber,
    }),
  };
  //creating a customer using Add Customer Api

  const onCreateCustomer = async () => {
    console.log(requestOptions);
    const res = await fetch(
      "http://localhost:4545/api/customers/Addcustomer",
      requestOptions
    );
    const data = await res.json();
    console.log(data);

    const formValues = {
      valid: data.valid,
      operatorName: data.operatorName,
      countryCode: data.countryCode,
      countryName: data.countryName,
    };
    setValidate(formValues);
    console.log(res);
  };
  //Deleting a customer
  const onDeleteCustomer = (customerId) => {
    console.log(customerId);
    axios
      .delete(
        `http://localhost:4545/api/customers/DeleteCustomer/${customerId}`
      )
      .then((response) => {
        console.log(response);
        setDeleted(0);
      });
    setDeleted(1);
  };

  //update a customer
  const onUpdateCustomer = () => {
    fetch(
      `http://localhost:4545/api/customers/update/${updatedFormik.values.id}`,
      requestUpdateOptions
    ).then((response) => {
      console.log(response);
      setDeleted(0);
    });
    setDeleted(1);
  };
  return (
    <div style={{ marginTop: "15px" }}>
      {customers.length == 0 ? (
        <h2>You dont have any customer records</h2>
      ) : (
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
      )}
      <h3>Add a Customer</h3>
      <form onSubmit={forimk.handleSubmit}>
        <input
          type="text"
          name="fullName"
          required="reuired"
          placeholder="Enter name"
          value={forimk.values.fullName}
          onChange={forimk.handleChange}
          onBlur={forimk.handleBlur}
        />
        {forimk.touched.fullName && forimk.errors.fullName ? (
          <p>{forimk.errors.fullName} </p>
        ) : null}
        <input
          type="text"
          name="adress"
          required="reuired"
          placeholder="Enter an adress"
          value={forimk.values.adress}
          onChange={forimk.handleChange}
          onBlur={forimk.handleBlur}
        />
        {forimk.touched.adress && forimk.errors.adress ? (
          <p>{forimk.errors.adress} </p>
        ) : null}
        <input
          type="text"
          name="mobileNumber"
          required="reuired"
          placeholder="Enter mobile number"
          value={forimk.values.mobileNumber}
          onChange={forimk.handleChange}
          onBlur={forimk.handleBlur}
        />
        {forimk.touched.mobileNumber && forimk.errors.mobileNumber ? (
          <p>{forimk.errors.mobileNumber} </p>
        ) : null}
        <button type="submit">Submit</button>

        <p style={{ display: "inline-block", marginRight: "5px" }}>
          {validate.countryName}
        </p>
        <p style={{ display: "inline-block", marginRight: "5px" }}>
          {validate.countryCode}
        </p>
        {validate.valid ? <p>valid</p> : <p>invalid</p> }

        {validate.valid}
        
        <p style={{ display: "inline-block", marginRight: "5px" }}>
          {validate.operatorName}
        </p>
      </form>

      <h3>update Customer</h3>
      <form onSubmit={updatedFormik.handleSubmit}>
        <input
          type="text"
          name="fullName"
          required="reuired"
          placeholder="Enter name"
          value={updatedFormik.values.fullName}
          onChange={updatedFormik.handleChange}
          onBlur={updatedFormik.handleBlur}
        />
        {updatedFormik.touched.fullName && updatedFormik.errors.fullName ? (
          <p>{updatedFormik.errors.fullName} </p>
        ) : null}

        <input
          type="text"
          name="adress"
          required="reuired"
          placeholder="Enter an adress"
          value={updatedFormik.values.adress}
          onChange={updatedFormik.handleChange}
          onBlur={updatedFormik.handleBlur}
        />
        {updatedFormik.touched.adress && updatedFormik.errors.adress ? (
          <p>{updatedFormik.errors.adress} </p>
        ) : null}

        <input
          type="text"
          name="mobileNumber"
          placeholder="Enter mobile number"
          value={updatedFormik.values.mobileNumber}
          onChange={updatedFormik.handleChange}
          onBlur={updatedFormik.handleBlur}
        />
        {updatedFormik.touched.mobileNumber &&
        updatedFormik.errors.mobileNumber ? (
          <p>{updatedFormik.errors.mobileNumber} </p>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

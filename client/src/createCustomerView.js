import React,{Component} from "react";
import '/Users/mohamadsoboh/ReactNativeProjects/challenge-repo/client/src/createCustomerView.css'
import {Link} from 'react-router-dom';
function InsertCustomerView() {
  return (
    <div className="input">
      <h1>Create A customer</h1>
     
      <form  className="form" >
        <div className="input" >
        <lable className="label" >customer name</lable>
        <input 
        type="text" 
        required />
        </div>
        <div className="input" >
        <lable className="label" >customer adress</lable>
        <input 
        type="text" 
        required />
        </div>
        <div className="input" >
        <lable className="label" >customer mobile</lable>
        <input 
        type="text" 
        required />
        </div>
      </form>
    </div>
  );
}

export default InsertCustomerView;

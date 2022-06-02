
  const express = require('express')
  const axios = require('axios')
  
  
  
  const mobile_validate = (mobile)=>
  axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${mobile}`)
  .then((response) =>console.log(response));

  module.exports = {
    mobile_validate
  };
  


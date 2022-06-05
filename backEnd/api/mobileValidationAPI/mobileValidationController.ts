
import axios from 'axios';  
  
  
  const mobile_validate =async (mobile :string)=>
  await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${mobile}`)
  .then((response) =>response.data);


  export default {
    mobile_validate};


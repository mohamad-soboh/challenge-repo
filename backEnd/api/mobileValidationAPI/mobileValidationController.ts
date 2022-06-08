
import axios from 'axios';  
  
  
  const mobile_validate =async (mobile :string)=>
  await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=a3ba4315e7044b0982636066821a3993&phone=${mobile}`)
  .then((response) =>response.data);


  export default {
    mobile_validate};


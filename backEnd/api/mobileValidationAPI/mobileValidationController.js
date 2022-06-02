  //validating  the form
  // const validate = (mobile)=>
  // axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=30a0870189ae4438ac41958b995fc39b&phone=${mobile}`)
  // .then((response) => setPhoneValidate([...response.data]));


  const validate = (req, res) => {
    Customer.find()
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
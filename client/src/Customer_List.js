import React from 'react'

export function Customer_List(props) {
    console.log( "this is  child");  
    console.log(props.customers);  

    return (
    <div>
        <div> Customer name</div>
        <div> Customer adress</div>
        <div> Customer mobile</div>
    </div>
  )
}

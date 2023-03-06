import React, { useRef, useState } from "react";
import checkstyle from "./Checkout.module.css";
import Axios from "axios";
// const isEmpty = (value) => value.trim() == "";
// const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [showOrderPopup, setOrderShowPopup] = useState(false);

  const nameRef = useRef();
  const addRef = useRef();
  const numRef = useRef();

  const orderHandler = (event) => {
    const username = nameRef.current.value;
    const useradd = addRef.current.value;
    const usernum = numRef.current.value;
    console.log(username);
    console.log(useradd);
    console.log(usernum);
    event.preventDefault();

    Axios.post("http://localhost:3001/create_order", {
      client_name: username,
      client_add: useradd,
      client_num: usernum,
    });
    // const data = await res.json();
    // if(res.status == '422'){

    // }
    // alert("Order placed");
   
    setTimeout(()=>{
      setOrderShowPopup(true);
    },3000);
  };

  // const handlePopUpClose = () => {
  //   setOrderShowPopup(false);
  // };

  return (
    <>
    <form onSubmit={orderHandler} className={checkstyle.form} method="POST">
      <div className={checkstyle.control}>
        {/* <label htmlFor="name">Your Name</label> */}
        <input
          type="text"
          name="client_name"
          id="name"
          ref={nameRef}
          placeholder="Your Name"
          required
        />
      </div>
      <div className={checkstyle.control}>
        {/* <label htmlFor="address">Address</label> */}
        <input
          type="text"
          name="client_add"
          id="add"
          ref={addRef}
          placeholder="Address"
          required
        />
      </div>
      <div className={checkstyle.control}>
        {/* <label htmlFor="number">Phone number</label> */}
        <input
          type="number"
          name="client_num"
          id="num"
          ref={numRef}
          placeholder="Phone Number"
          required
        />
      </div>
      <div className={checkstyle.actions}>
        {/* Ex of Props drilling,type is btn so that it doesn't submit the form */}
        <button
          type="button"
          className={checkstyle.button}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={checkstyle.confirm} onClick={props.onOrder} >Confirm</button>
      </div>
    </form>
    {showOrderPopup && 
    <div className={checkstyle.popup}>
    <h3>Order Placed successfully!</h3>
    <button onClick={props.onClose}>Close</button>
    </div>
    }
    </>
  );
};

export default Checkout;

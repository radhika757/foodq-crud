import React, { useRef } from "react";
import checkstyle from "./Checkout.module.css";

// const isEmpty = (value) => value.trim() == "";
// const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const addRef = useRef();
  const numRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const username = nameRef.current.value;
    const useradd = addRef.current.value;
    const usernum = numRef.current.value;
    // const enteredNameValid = !isEmpty(nameRef);
    // const enteredAddValid = !isEmpty(addRef);
    // const enteredNumValid
  };

  return (
    <form onSubmit={confirmHandler} className={checkstyle.form}>

      <div className={checkstyle.control}>
        {/* <label htmlFor="name">Your Name</label> */}
        <input type="text" id="name" ref={nameRef} placeholder="Your Name" required />
      </div>
      <div className={checkstyle.control}>
        {/* <label htmlFor="address">Address</label> */}
        <input type="text" id="add" ref={addRef} placeholder="Address" required />
      </div>
      <div className={checkstyle.control}>
        {/* <label htmlFor="number">Phone number</label> */}
        <input type="number" id="num" ref={numRef} placeholder="Phone Number" required />
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
        <button className={checkstyle.confirm}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

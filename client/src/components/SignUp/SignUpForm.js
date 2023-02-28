import React, { Fragment } from "react";
import formstyles from "./SignUpForm.module.css";
import { signInSchema } from "./FormValidation";


const SignUpForm = () => {
  const validateUser = async(event) => {
    event.preventDefault();
    let formData ={
        name: event.target[0].value ,
        number: event.target[1].value,
        email:event.target[2].value,
        address: event.target[3].value
    };
    const checkValid = await signInSchema.isValid(formData);
        if(checkValid){
            alert('Thanks');
        } else{
            alert('Incorrect');
        }
  };
  return (
    <Fragment>
      <div className={formstyles["main-frame"]}>
        <h2>Sign Up</h2>
        <h5>
          or <span style={{ color: "#b94517" }}> Login to your account </span>
        </h5>

        <form onSubmit={validateUser}>
          <div>
            <input type="text" placeholder="Name" />
          </div>
          <div>
            <input type="number" placeholder="Phone Number" />
          </div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <textarea placeholder="Address" />
            <h5 style={{ color: "#4B9CD3" }}>Have a referral code?</h5>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;

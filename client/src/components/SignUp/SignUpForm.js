import React, { Fragment, useState } from "react";
import formstyles from "./SignUpForm.module.css";
import { signInSchema } from "./FormValidation";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";



const SignUpForm = (props) => {
  // name, num, email, add
  const [newMember, setNewMember] = useState("");
  const [memberNum, setMemberNum] = useState(0);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberAdd, setMemberAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConfirm = () => {
    setIsSubmitted(false);
    window.location.reload();
  };
  const validateUser = async (event) => {
    event.preventDefault();
    let formData = {
      name: event.target[0].value,
      number: event.target[1].value,
      email: event.target[2].value,
      address: event.target[3].value,
    };
    console.log(formData);
    const checkValid = await signInSchema.isValid(formData);
    if (checkValid) {
      axios.post("http://localhost:3001/new_member", {
        name: newMember,
        num: memberNum,
        email: memberEmail,
        add: memberAdd,
      });
      setIsSubmitted(true);
    } else {
      alert("Incorrect");
    }
  };
  return (
    <Fragment>
      <div className={formstyles["main-frame"]}>
        <h3>Become a member</h3>
        <h6>
          <span style={{ color: "#b94517" }}>Unlock coupons worth 500* </span>
        </h6>

        <form onSubmit={validateUser}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={newMember}
              onChange={(e) => {
                setNewMember(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone Number"
              value={memberNum}
              onChange={(e) => {
                setMemberNum(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={memberEmail}
              onChange={(e) => {
                setMemberEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              placeholder="Address"
              value={memberAdd}
              onChange={(e) => {
                setMemberAddress(e.target.value);
              }}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>

      {isSubmitted && (
        <SweetAlert success title="Prost!" onConfirm={handleConfirm}  customClass={formstyles["my-sweet-alert"]} className={{
          title: 'my-sweet-alert-title', // Add a custom class name to the title
          confirmButton: 'my-sweet-alert-button', // Add a custom class name to the confirm button
        }}>
          Welcome abode
        </SweetAlert>
      )}
    </Fragment>
  );
};

export default SignUpForm;

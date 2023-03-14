import React, { Fragment } from "react";
import styles from "./SignUp.module.css";
import FoodInfo from "./FoodInfo";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <FoodInfo />
        <SignUpForm />
      </div>
    </Fragment>
  );
};

export default SignUp;

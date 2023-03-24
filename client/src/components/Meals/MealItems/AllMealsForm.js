import React, { useRef, useState } from "react";
import styles from "./AllMealsForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {

  // state to control whether the form is valid or not.
  const [amountValid, setAmountValid] = useState(true);

  const amountInputRef = useRef();  // Refs with custom component.

  const submitHandler = (event) => {
    event.preventDefault(); // prevent reload
    // extract entered amount using refs.(alternate is two-way binding)
    const enteredAmount = amountInputRef.current.value; // this value is always a string
   
    const enteredAmountNum = +enteredAmount; // convert string to num
   
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
   
      setAmountValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNum);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
      <Input
        ref={amountInputRef}
        // label='Amount'
        input={{
          id: 'amount',  //"amount_" + props.id
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',  
        }}
      />
      </div>
      <button className={styles.btnadd}>+Add</button>
      {!amountValid && <p>Please enter a valid amount (1-5). </p>}
    </form>
  );
};

export default MealItemForm;

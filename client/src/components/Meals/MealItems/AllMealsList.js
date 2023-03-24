// Render a single meal item
import { useContext } from "react";
import React from "react";
import styles from "./AllMealsList.module.css";
import AllMealsForm from "./AllMealsForm";
import CartContext from "../../../Store/cart-context";

const AllMealsList = (props) => {
  const cartCtx = useContext(CartContext);

  // this price will format the price we are fetching, only two decimat places and $ sign.
  const price = `$${props.price}`;


  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.title, // why title and not name?
      amount: amount,
      price: props.price
    });
  };

  return (
    // wrapper around every meal item. className={styles['meal-wrap']}
    <div>
      <li className={styles.meal}>
        {/* Rendering rame of the meal through props */}

        <img className={styles.fimg} src={props.img} />
        <div className={styles["meal-new"]}>
          <h4>{props.title}</h4>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.block}>
          <div className={styles.price}>{price}</div>
          <div className={styles.time}> <span>.</span>  23mins <span>.</span></div> 
          <AllMealsForm onAddToCart={addItemToCartHandler} />
          </div>
         
        </div>
        {/* Simple form to enter the amount you want to use    */}
        <div>
        
        </div>
      </li>
    </div>
  );
};

export default AllMealsList;

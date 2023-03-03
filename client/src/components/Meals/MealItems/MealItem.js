// Render a single meal item
import { useContext } from "react";
import React from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  // this price will format the price we are fetching, only two decimat places and $ sign.
  const price = `$${props.price}`;
//   console.log("price:",props.price)
// console.log(price);
// console.log('price');

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
          <h3>{props.title}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>{price}</div>
        </div>
        {/* Simple form to enter the amount you want to use    */}
        <div>
          <MealItemForm onAddToCart={addItemToCartHandler} />
        </div>
      </li>
    </div>
  );
};

export default MealItem;

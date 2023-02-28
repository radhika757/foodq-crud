import React from "react";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import cartstyles from "./HeaderCart.module.css";
import CartContext from "../../Store/cart-context";

// Now the Cart button component will be re-evaluated by react everytime the context changes.
const HeaderCart = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const numOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClasses = `${cartstyles.button} ${
    btnHighlighted ? cartstyles.bump : ""
  }`; // this animates when rendering
  // using useEffect to make sure it animates when new item is added.
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);

    // cleanup function for side effects
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={cartstyles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={cartstyles.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;

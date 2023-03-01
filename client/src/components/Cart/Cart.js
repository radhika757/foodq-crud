import React from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; // to keep 2 decimal places fixed.

  // to check if the cart has items
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Trigger the CartProvider add ()
  const addItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id} // we have to pass a key since its a list
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} // onRemove prop, name same as CartItem component provider.
          onAdd={addItemToCartHandler.bind(null, item)}
        />
        // <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    // key={props.id} each child in a list should have a unique key.
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {/* Order btn should only show up when there are items in cart. */}
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

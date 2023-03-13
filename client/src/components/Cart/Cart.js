import React, { useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import empty from "../../components/assets/emptyC.png";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isEmptyCart, setEmptyCart] = useState(true);

  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);
  const totalAmount = `$${cartCtx.totalAmount}`; // to keep 2 decimal places fixed.

  // to check if the cart has items
  const hasItems = cartCtx.items.length > 0;
console.log(hasItems);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Trigger the CartProvider add ()
  const addItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // order handler
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // clear cart
  const clearHandler = () => {
    if(!hasItems)
    setEmptyCart(false);
    
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

  const modalActions = (
    <>
      {" "}
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>

        {/* Order btn should only show up when there are items in cart. */}
        {hasItems && (
          <>
            <button onClick={clearHandler}>Clear cart</button>
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          </>
        )}
      </div>
    </>
  );

  return (
    // key={props.id} each child in a list should have a unique key.
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!hasItems && (
        <div className={styles.cartpstn}>
          <div>
            <img src={empty} />
          </div>
          <div>
            <p className={styles.empty}>Your cart feels light!</p>
          </div>
        </div>
      )}
      {!isCheckout && modalActions}
      {/* Ex of props drilling  */}
      {isCheckout && (
        <Checkout onCancel={props.onClose} onClose={props.onClose} />
      )}
      {/* <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button> */}
      {/* Order btn should only show up when there are items in cart. */}
      {/* {hasItems && <button className={styles.button}>Order</button>}
      </div> */}
    </Modal>
  );
};

export default Cart;

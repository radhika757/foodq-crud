import React, { useState } from "react";
import CartProvider from "../../Store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import ChefBox from "../UI/ChefBox";
import Meals from "../Meals/Meals";
import SignUp from "../SignUp/SignUp";

const Home = (props) => {
  const [cartShow, setCartShow] = useState(false);
  //  function that should be called when close btn / backdrop is clicked
  const showCartHandler = () => {
    setCartShow(true);
  };

  const hideCartHandler = () => {
    setCartShow(false);
  };

  return (
    <React.Fragment>
      <CartProvider>
        {/* Rendering Cart component conditionally. */}
        {cartShow && <Cart onClose={hideCartHandler} />}
        {/* to call the showCart() we pass a pointer to the function [props that hold function / like custom events] */}
        <Header onShow={showCartHandler} />
        {/* we dont execute it ()  just point at it. */}
        <main>
          <Meals />
        </main>
        <ChefBox />
        <SignUp />
      </CartProvider>
    </React.Fragment>
  );
};

export default Home;

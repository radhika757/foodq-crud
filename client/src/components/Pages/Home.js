import React, { useState, useEffect } from "react";
import CartProvider from "../../Store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import ChefBox from "../UI/ChefBox";
import Meals from "../Meals/Meals";
import SignUp from "../SignUp/SignUp";
import Offer from "./Offer";

const Home = (props) => {
  // state change for offer popup
  const [showOfferPopup, setOfferPopup] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setOfferPopup(true);
    },3000); // popup after 3 secs
    return () =>clearTimeout(timer);
  },[]);

  const handleOfferPopup = () =>{
    setOfferPopup(false);
  }

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
      {showOfferPopup && <Offer onClick={handleOfferPopup}/>}
      
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

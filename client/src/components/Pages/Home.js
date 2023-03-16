import React, { useState, useEffect } from "react";
import CartProvider from "../../Store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import ChefBox from "../UI/ChefBox";
import Meals from "../Meals/Meals";
import SignUp from "../SignUp/SignUp";
import Offer from "./Offer";
import "./Home.css";
import Features from "../UI/Features";
import Footer from '../Layout/Footer';

const Home = (props) => {
  // state change for offer popup
  const [showOfferPopup, setOfferPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOfferPopup(true);
    }, 2000); // popup after 3 secs
    return () => clearTimeout(timer);
  }, []);

  const handleOfferPopup = () => {
    setOfferPopup(false);
    const popbody = document.querySelector(".popupbackg");
    // console.log(body);
    popbody.classList.remove("popupbackg");
  };

  const handleSignUpPopup = () =>{
    
    console.log('hey');
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
      <div className="popupbackg">
        {showOfferPopup && <Offer onClick={handleOfferPopup} onSignup={handleSignUpPopup()} />}
      </div>
      <CartProvider>
        {cartShow && <Cart onClose={hideCartHandler} />}
        <Header onShow={showCartHandler} />
      
        <main>
          <Meals />
        </main>
        {/* Fetaures box */}
        <Features/>
        <ChefBox />
        <SignUp />
        <Footer/>
      </CartProvider>
    </React.Fragment>
  );
};

export default Home;

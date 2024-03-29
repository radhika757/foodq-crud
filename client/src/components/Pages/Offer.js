import  { useState, useRef } from "react";
import offerstyles from "./Offer.module.css";
import wave from "../assets/002-goodbye.png";
import bomb from "../assets/001-bomb.png";
import fire from "../assets/003-fire.png";


const Offer = (props) => {
  const [showOfferPopup, setShowOfferPopup] = useState(true);
  

  function closeOfferOverlay() {
      console.log(props.onSignup);
        // setShowOfferPopup(false);
  }
  return (
    <>
    {showOfferPopup && 
        (<div className={offerstyles.offerbox}>
        <div className={offerstyles.offercontent}>
          <div className={offerstyles.iconrow}>
            <img src={wave} alt="icon 1" className={offerstyles.icon} />
            <img src={bomb} alt="icon 2" className={offerstyles.icon} />
            <img src={fire} alt="icon 3" className={offerstyles.icon} />
          </div>
          <h5>ENJOY 20% OFF</h5>
          <p>Sign up for exclusive offers on your first order + free shipping over over $30</p>
          <div className={offerstyles.divbtns}>
            <button className={offerstyles.signbtn} onClick={props.onSignup}>Sign Up</button>
            <button onClick={props.onClick} className={offerstyles.nextime}>
              Next time
            </button>
          </div>
        </div>
      </div>

    )}
  </>
)};

export default Offer;

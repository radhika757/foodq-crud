import react, { useState } from "react";
import offerstyles from "./Offer.module.css";
import wave from "../assets/002-goodbye.png";
import bomb from "../assets/001-bomb.png";
import fire from "../assets/003-fire.png";
// import Popup from "react-animated-popup";

const Offer = (props) => {
  const [showOfferPopup, setShowOfferPopup] = useState(true);

  function closeOfferOverlay() {
    setShowOfferPopup(true);
  }
  return (
    // <Popup>
    <>
    {showOfferPopup && 
        (<div className={offerstyles.offerbox}>
        <div className={offerstyles.offercontent}>
          <div className={offerstyles.iconrow}>
            <img src={wave} alt="icon 1" className={offerstyles.icon} />
            <img src={bomb} alt="icon 2" className={offerstyles.icon} />
            <img src={fire} alt="icon 3" className={offerstyles.icon} />
          </div>
          <h5>Sign Up for exciting offers!</h5>
          <p>Sign Up to ensure you don't miss offers on your favourite dishes</p>
          <div className={offerstyles.divbtns}>
            <button className={offerstyles.signbtn} onClick={closeOfferOverlay}>Sign Up</button>
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

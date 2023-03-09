import React from "react";
import "./Features.css";
import img1 from '../assets/img1.jpg';
import delivery from '../assets/delivery.jpg';

const Features = () => {
  return (
    <>
      <div className="main-box">
        <div className="box-1" >
        {/* <h2>Element 1</h2> */}
        <img alt="img1" src={img1} />
        <p>Customized dishes</p>
        </div>
        <div className="box-2">
            <img alt="delivery" src={delivery}/>
        <p>Home delivery</p>
        </div>
        <div className="box-3">
        <img alt="delivery" src={delivery}/>
        <p>Curated veg options</p>
        </div>
        <div className="box-4" >
        <img alt="delivery" src={delivery}/>
        <p>Event catering</p>
        </div>
      </div>
    </>
  );
};

export default Features;
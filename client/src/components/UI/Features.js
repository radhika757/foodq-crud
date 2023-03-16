import React from "react";
import "./Features.css";
import img1 from '../assets/img1.jpg';
// import delivery from '../assets/delivery.jpg';
// import chef from '../assets/chef2.jpg';
import buffet from "../assets/buffet.jpg";
import rooftop from "../assets/rooftop.jpg";
import reserve from '../assets/reserve.jpg';

const Features = () => {
  return (
    <>
   <div className="section-50">
      <div className="main-box">
       
         <h1 className="maintitle">Collections</h1>
         
         
        <div className="col-box" >
        
        <img alt="img1" src={img1} />
        <p>Vegeterian & Jain options</p>
        </div>
       
        <div className="col-box">
        <img alt="reserve" src={reserve}/>
        <p>Instant Reservations</p>
        </div>
        <div className="col-box" >
        <img alt="buffet" src={buffet}/>
        <p>Event catering</p>
        </div>
        <div className="col-box" >
        <img alt="rooftop" src={rooftop}/>
        <p>Insta worthy ambience</p>
        </div>
        
      </div>
      </div>
    </>
  );
};

export default Features;
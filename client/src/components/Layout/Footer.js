import React from "react";
import "./Footer.css";
import heart from '../assets/001-heart.png';

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer-wrap">
        <div className="footer-logo">
          <h1>FoodQ</h1>
          <h4>Mumbai</h4>
        </div>
        <div className="footer-content">
          <div className="footer-content-1">
            <ul>
              <li>Terms and conditions</li>
              <li>Privacy Policy</li>
              <li>Teams</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="footer-content-2">
            <ul>
              <li>Help and Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>
          <div className="footer-content-3">
            <ul>
              <li>21st Street, Bandra</li>
              <li>Building No 2, Fortune sympony</li>
              <li>Behind Bandra Kurla Complex</li>
              <li>Mumbai- 400021</li>
            </ul>
          </div>
        </div>
        <div className="footer-developer">
          <h5>Made with <img src={heart} alt="love"/> By <a href="https://github.com/radhika757" target="_blank">Radhika</a></h5>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;

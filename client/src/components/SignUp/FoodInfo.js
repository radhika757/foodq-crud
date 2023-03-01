import bgimg from "../assets/bmenu.jpg";
import bgimgstyles from "./FoodInfo.module.css";
import React, { Fragment } from "react";

const FoodInfo = () => {
  return (
    <Fragment>
      <div className={bgimgstyles.backg}>
        <img alt="menu" src={bgimg} />
      </div>
    </Fragment>
  );
};
export default FoodInfo;

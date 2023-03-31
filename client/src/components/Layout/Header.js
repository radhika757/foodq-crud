import React from "react";
import meals from "../assets/meals.jpg";
import headerstyles from "./Header.module.css";
import HeaderCart from "./HeaderCart";
// import Login from "./Login";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={headerstyles.header}>
        <h1 style={{ ["paddingLeft"]: "50px" }}>Food-Q</h1>

        <div className={headerstyles.headerright}>
          <NavLink to="/login">Log In</NavLink>
        {/* We execute the showCartHandler()  */}
        <HeaderCart onClick={props.onShow} />
        </div>
      </header>
      <div className={headerstyles["main-image"]}>
        <img src={meals} alt="food-table" />
      </div>
    </>
  );
};

export default Header;

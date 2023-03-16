import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import {Link} from 'react-router-dom';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginHandler = async () => {
    console.log("hi");
    console.log(email);
    console.log(password);
    await axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        console.log("res");
        const userData = res.data.user;
        const isAuthenticated = res.data.isAuthenticated;

        if (res.data.isAuthenticated) {
          history.push({
            pathname: "/admins",
            state: { user: userData, isAuthenticated },
          });
        }
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <React.Fragment>
      <div className="background">
        <Link to="/"><h2 className="logoname">FoodQ</h2></Link>
        <div className="container">
          <h2 className="adminname">Admin Login</h2>

          <form className="form" onSubmit={submitHandler}>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btnlogin">Login</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;

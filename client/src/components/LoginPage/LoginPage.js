import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import illustrate from "../assets/illustrate.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  const handleAdminClick = () => {
    setIsAdmin(true);
  };

  const handleUserClick = () => {
    setIsAdmin(false);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      const userData = res.data.user;
      const isAuthenticated = res.data.isAuthenticated;
      if (isAuthenticated) {
        history.push({
          pathname: "/AdminHome",
          failureRedirect: "/login",
          state: { user: userData, isAuthenticated },
        });
      } else if (res.status === 401) {
        const authError = await res.json();
        // display authentication error message to user
        console.log(authError);
        setErr(err.response.data.message);
      } else if (res.status === 500) {
        const internalErr = await res.json();
        setErr(err.response.data.message);
      }
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <div className="contain">
        <div className="illus">
          <img src={illustrate} />
        </div>
        <div className="background">
          {err && (
            <>
              <div
                className="alert alert-danger alert-dismissible fade show  align-items-center"
                role="alert"
              >
                <strong className="me-2">
                  <b>{err}</b>
                </strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </>
          )}
          <Link to="/">
            <h2 className="logoname">FoodQ</h2>
          </Link>
          <div className="login_btns nav nav-pills" id="ex1" role="tablist">
            <button
              className={`nav-link ${isAdmin ? "" : "active"}`}
              id="tab-login"
              onClick={handleUserClick}
            >
              USER
            </button>
            <button
              className={`nav-link ${isAdmin ? "active" : ""}`}
              id="tab-register"
              onClick={handleAdminClick}
            >
              ADMIN
            </button>
          </div>
          <div className="container tab-content">
            {isAdmin ? (
              <>
                <h2 className="adminname">Admin Login</h2>

                <form className="form" onSubmit={loginHandler}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your Email"
                    className="form-control bottom"
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
              </>
            ) : (
              <div className="tab-pane fade show active" id="user-login-form">
                <h2 className="adminname">User Login</h2>
                <form>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Enter your Name"
                    className="form-control bottom"
                    onChange={(e) => {
                      //   setEmail(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    name="user_num"
                    placeholder="Valid Phone Number"
                    className="form-control"
                  />
                  <button className="btnlogin">Login</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;

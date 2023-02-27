import axios from "axios";
import React, { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";

const Navbaar = () => {
  const location = useLocation();
  const history = useHistory();
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   if (location.state.isAuthenticated) {
  //     setIsAuthenticated(true);
  //   }
  let isAuthenticated = false;
  if (location.state !== undefined) {
    if (location.state.isAuthenticated) {
      isAuthenticated = true;
    }
  }
  const logoutHandler = async () => {
    await axios.get("http://localhost:3001/logout").then((res) => {
      history.push({
        pathname: "/",
        state: {
          isAuthenticated: false,
        },
      });
      //   setIsAuthenticated(false);
    });
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Admin Panel
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuthenticated && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/user"
                  >
                    Add Admin
                  </NavLink>
                </li>
              </ul>
            )}

            <form className="d-flex">
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={logoutHandler}
              >
                {isAuthenticated ? "Logout" : "login"}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;

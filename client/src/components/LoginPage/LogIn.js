import React, { useState } from "react";

function LogIn() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminClick = () => {
    setIsAdmin(true);
  };

  const handleUserClick = () => {
    setIsAdmin(false);
  };

  return (
    <div>
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
      <div className="tab-content">
        {isAdmin ? (
          <div className="tab-pane fade show active" id="admin-login-form">
            <h2 className="adminname">Admin Login</h2>
            {/* onSubmit={loginHandler} */}
            <form className="form" >
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="form-control"
                onChange={(e) => {
                //   setEmail(e.target.value);
                }}
              />
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                //   setPassword(e.target.value);
                }}
              />
              <button className="btnlogin">Login</button>
            </form>
          </div>
        ) : (
          <div className="tab-pane fade show active" id="user-login-form">
            <form>
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="form-control"
                onChange={(e) => {
                //   setEmail(e.target.value);
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogIn; 

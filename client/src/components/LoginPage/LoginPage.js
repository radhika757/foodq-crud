import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginHandler = async () => {
    console.log('hi');
    console.log(email);
    console.log(password);
    await axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        console.log('res');
        const userData = res.data.user;
        const isAuthenticated = res.data.isAuthenticated;

        if (res.data.isAuthenticated) {
          history.push({
            pathname: "/",
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
    <div className="container">
      <div className="row login-box">
        <div className="col-6">
          <div className="login-form">
            <h1 className="text-center">Login</h1>
            <form className="form" onSubmit={submitHandler}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

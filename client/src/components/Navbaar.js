import axios from "axios";
import React, { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const Navbaar = () => {
  const location = useLocation();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    if (location.state == isAuthenticated) {
      // location.state.isAuthenticated
      setIsAuthenticated(true);
    }
  // let isAuthenticated = false;
  if (location.state !== undefined) {
    if (location.state == isAuthenticated) {
      // location.state.isAuthenticated
      isAuthenticated = true;
    }
  }
  const logoutHandler = async () => {
    console.log('logouthandler');
    await axios.post("http://localhost:3001/logout").then((res) => {
      history.push({
        pathname: "/login",
        state: {
          isAuthenticated: false,
        },
      });
        setIsAuthenticated(false);
    });
  };
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-center p-3">
      
          <Navbar.Brand href="/" className="me-5">FoodQ</Navbar.Brand>
          <Nav className="">
            <Nav.Link href="AdminHome" className="ms-5">Meals</Nav.Link>
            <Nav.Link href="admins" className="">Admin</Nav.Link>
            <Nav.Link href="orders" className="">Orders</Nav.Link>
            <Nav.Link href="subscription" className="">Registers</Nav.Link>
           <Nav.Link  onClick={logoutHandler} className="" >Logout</Nav.Link>
       
          </Nav>
        
      </Navbar>
    </React.Fragment>
  
  );
};

export default Navbaar;

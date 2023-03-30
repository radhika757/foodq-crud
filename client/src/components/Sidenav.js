import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Sidenav.css";

const Sidenav = () => {
  return (
    <div>
      <Navbar> 
      <Nav className="Nav flex-column p-4 m-4 mt-5 justify-content-center bg-light ">
        <Nav.Link href="#">Dashboard</Nav.Link>
        <Nav.Link href="register" >Add a new meal</Nav.Link>
        <Nav.Link href="user">Add Admin</Nav.Link>
      </Nav>
    </Navbar>
    </div>
  );
};

export default Sidenav;
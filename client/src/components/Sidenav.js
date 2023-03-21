import React from "react";
import { Nav, Navbar } from "react-bootstrap";

// import "./Sidenav.css";

const Sidenav = () => {
  return (
    <div>
      <Navbar> 
        {/* className="square border-top" */}
      <Nav className="flex-column p-4 m-4 justify-content-center square border-end">
        <Nav.Link href="#">Dashboard</Nav.Link>
        <Nav.Link href="register" >Add a new meal</Nav.Link>
        <Nav.Link href="user">Add Admin</Nav.Link>
      </Nav>
    </Navbar>
    </div>
  );
};

export default Sidenav;
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
    await axios.get("http://localhost:3001/logout").then((res) => {
      history.push({
        pathname: "/",
        state: {
          isAuthenticated: false,
        },
      });
        setIsAuthenticated(false);
    });
  };
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
      
          <Navbar.Brand href="Dashboard" className="me-5">Dashboard</Navbar.Brand>
          <Nav className="me-auto ">
            <Nav.Link href="AdminHome" className="ms-5">Meals</Nav.Link>
            <Nav.Link href="user" className="">Admin</Nav.Link>
            <Nav.Link href="orders" className="">Orders</Nav.Link>
            <Nav.Link href="subscription" className="">Registers</Nav.Link>
            <Nav.Link href="" className="">Logout</Nav.Link>
          </Nav>
        
      </Navbar>
    </React.Fragment>
    // <header>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
    //     <div className="container-fluid">
    //       <NavLink className="navbar-brand" to="/AdminHome">
    //         Admin Panel
    //       </NavLink>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarSupportedContent"
    //         aria-controls="navbarSupportedContent"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         {isAuthenticated && (
    //           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //             <li className="nav-item">
    //               <NavLink
    //                 className="nav-link active"
    //                 aria-current="page"
    //                 to="/user"
    //               >
    //                 Add Admin
    //               </NavLink>
    //             </li>
    //           </ul>
    //         )}

    //         <form>
    //           {isAuthenticated ? (
    //             <button
    //               className="btn btn-outline-success"
    //               type="submit"
    //               onClick={logoutHandler}
    //             >
    //               Logout
    //             </button>
    //           ) : (
    //             <NavLink to="/login" className="btn btn-primary">
    //               Login
    //             </NavLink>
    //           )}
    //         </form>
    //       </div> */}
    //     </div>
    //   </nav>
    // </header>
  );
};

export default Navbaar;

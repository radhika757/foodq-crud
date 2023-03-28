import Axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Navbaar from "./Navbaar"
import Sidenav from "./Sidenav";
import { Table } from "react-bootstrap";

const Admins = (props) => {
  const [getadmindata, setAdmindata] = useState([]);
  // console.log(getadmindata)
  Axios.get("http://localhost:3001/getadmin").then((response) => {
    setAdmindata(response.data);
    // alert('Admin Created');
    //  console.log(response.data);
  });

  const deleteadmin = async (id) => {
    const res2 = await fetch(`http://localhost:3001/delete_admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

   // console.log(`delete ${id}`);
  };
  let isAuthenticated = false;
  if (props.location.state !== undefined) {
    if (props.location.state.isAuthenticated) {
      isAuthenticated = true;
    } 
  }
  console.log(isAuthenticated);
  return (
    <>
      <Navbaar />
      <div className="d-flex">
        <Sidenav />
        <div>
          <h2 className="text-uppercase m-4 title text-center" >Admin</h2>
          {/* {isAuthenticated ? ( */}
          <Table striped bordered hover className="m-4">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Admin Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {getadmindata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.admin_name}</td>
                      <td>{element.admin_email}</td>
                      <td>{element.admin_pass} </td>

                      <td className="d-flex ">
                        {/* <NavLink to={`view/${element.id}`}> <button className="btn btn-light btn-sm"><RemoveRedEyeIcon /></button></NavLink> */}

                        <NavLink to={`edit/${element.id}`}>
                          <button className="btn btn-primary btn-sm p-2 flex-grow-1">
                            <CreateIcon />
                          </button>
                        </NavLink>

                        <button
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={()=>{
                            deleteadmin(element.id)
                          }}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          {/* ) : (
        <h1>Please Login</h1>
      ) */}
        </div>
      </div>
    </>
  );
};

export default Admins;

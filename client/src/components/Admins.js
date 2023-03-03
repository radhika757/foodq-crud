import Axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Admins = (props) => {
  const [getadmindata, setAdmindata] = useState([]);
// console.log(getadmindata)
  Axios.get("http://localhost:3001/getadmin").then((response) => {
    setAdmindata(response.data);
    //  console.log(response.data);
  });
  
  const deleteadmin = (id) =>{
    console.log(`delete ${id}`);
  }
  // let isAuthenticated = false;
  // if (props.location.state !== undefined) {
  //   if (props.location.state.isAuthenticated) {
  //     isAuthenticated = true;
  //   }
    
  // }
  // console.log(isAuthenticated);
  return (
    <>
      {/* {isAuthenticated ? ( */}
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
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
                     
                         <NavLink to={`edit/${element.id}`}><button className="btn btn-primary btn-sm m-2"><CreateIcon /></button></NavLink>
                          
                       
                      
                      <button className="btn btn-danger btn-sm p-2" onClick={deleteadmin}>
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      {/* ) : (
        <h1>Please Login</h1>
      ) */}
    </>
  );
};

export default Admins;

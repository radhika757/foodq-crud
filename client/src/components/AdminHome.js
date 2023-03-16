import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useLocation } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
import Navbaar from "./Navbaar";

const AdminHome = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);  //autentication should be initially false
  console.log("hey");

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);

  const location = useLocation();
  const { state } = location;
  // let isAuthenticated = false; 

  let user = [];
  useEffect(()=>{
    if (state !== undefined) {
      isAuthenticated = true;
      user.push(state.user);
    }
    console.log(getuserdata);
    console.log(state);
  console.log(isAuthenticated);
    if (isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  })
  
  const getdata = async () => {
    const res = await fetch("http://localhost:3001/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json(); 
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    return () => {
      setUserdata([]); // unmounting the state
    };
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:3001/delete_meal/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <>
      <Navbaar />
      {udata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.meal_name}</strong> added succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.meal_name}</strong> updated succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.meal_name}</strong>deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {isAuthenticated && (
        <div className="mt-4">
          {/* <div className="container"> */}
            {user.map((user) => {
              return <h1>Hey {user.admin_name}</h1>;
            })}
            <div className="row">
              <div className="col">
                
                <NavLink to="/register" className="btn btn-outline-primary">
                  Add a Meal
                </NavLink>
               

                <table className="table">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">id</th>
                      <th scope="col">Meal Name</th>
                      <th scope="col">Meal Description</th>
                      <th scope="col">Meal price</th>
                      <th scope="col">Meal availability</th>
                      <th scope="col">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getuserdata.map((element, id) => {
                      return (
                        <>
                          <tr>
                            <th scope="row">{id + 1}</th>
                           
                            <td>{element.meal_title}</td>
                            <td>{element.meal_descr}</td>
                            <td> $ {element.meal_price} </td>
                            <td>{element.meal_avail}</td>
                            <td className="d-flex ">
                              
                              <NavLink to={`edit/${element.meal_id}`}>
                                <button className="btn btn-primary btn-sm m-2">
                                  <CreateIcon />
                                </button>
                              </NavLink>
                              <button
                                className="btn btn-danger btn-sm m-2"
                                onClick={() => deleteuser(element.meal_id)}
                              >
                                <DeleteOutlineIcon />
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          
        </div>
      )}
    </>
  );
};

export default AdminHome;

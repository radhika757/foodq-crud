import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";


const User = () => {
  const [adName, setAdName] = useState("");
  const [adPass, setAdPass] = useState("");
  const [adEmail, setAdEmail] = useState("");
  //   const [date, setDate] = useState("");
  //   const [adminList, setAdminList] = useState([]);

  const submitData = () => {
    Axios.post("/add_admin", {
      name: adName,
      pass: adPass,
      email: adEmail,
    });
    if (Axios.post) {
      alert("User added");
      // setTimeout(()=>{
      //     window.location.reload(true);
      // },2000);
    }
  };
  return (
    <>
      <div>
        
        <NavLink to="/admins" className="btn btn-outline-primary m-2">
          Admin
        </NavLink>
      </div>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            {/* <NavLink to="/">Home</NavLink> */}
            <h2>Enter a Admin</h2>
            <form className="form-card mt-4">
              <div className="row justify-content-between text-left m-4">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-control-label px-3"
                  >
                    Admin name
                  </label>
                  <input
                    type="text"
                    //   value={inpval.name}
                    onChange={(e) => {
                      setAdName(e.target.value);
                    }}
                    name="name"
                    className="form-control"
                    id="adname"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-control-label px-3"
                  >
                    Set a password
                  </label>
                  {/* <small>- A / NA</small> */}
                  <input
                    type="password"
                    //   value={inpval.mobile}
                    onChange={(e) => {
                      setAdPass(e.target.value);
                    }}
                    name="pass"
                    className="form-control"
                    id="adpass"
                  />
                </div>
              </div>
              {/* -- */}
              <div className="row justify-content-center text-left m-4">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-control-label px-3"
                  >
                    Admin email
                  </label>
                  <input
                    type="email"
                    //   value={inpval.age}
                    onChange={(e) => {
                      setAdEmail(e.target.value);
                    }}
                    name="email"
                    className="form-control"
                    id="addemail"
                  />
                </div>
                {/* <div className="form-group col-sm-6 flex-column d-flex">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-control-label px-3"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    //   value={inpval.email}
                      onChange={(e)=>{
                        setDate(e.target.value);
                      }}
                    name="date"
                    className="form-control"
                    id="addate"
                  />
                </div> */}
              </div>
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div> */}
              <div className="row justify-content-center">
                <button
                  type="submit"
                  onClick={submitData}
                  className="btn btn-success form-group col-sm-4"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;

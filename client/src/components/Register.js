import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import Navbaar from "./Navbaar";
import "./Register.css";
import Sidenav from "./Sidenav";


const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    meal_name: "",
    meal_descr: "",
    meal_price: 0,
    meal_avail: "",
    meal_time:0,
    meal_rate:0,
    meal_type: ''
  });
  console.log(inpval);
  const setdata = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { meal_name, meal_descr, meal_price, meal_avail, meal_time,meal_rate, meal_type } = inpval;
    // console.log(inpval);

    const res = await fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   "Accept":"application/json"
      },
      body: JSON.stringify({
        meal_name,
        meal_descr,
        meal_price,
        meal_avail,
        meal_time,
        meal_rate,
        meal_type
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      history.push("/AdminHome");
      setUdata(data);
      console.log("Meal added");
    }
    // }
  };

  return (
    <>
      <Navbaar />
      <div className="d-flex">
        <Sidenav /> 
        <div className="container-fluid py-5">
      <div className="row d-flex justify-content-center" style={{width:"70em"}}>
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
    
          <h2 className="text-uppercase m-2 title">Enter a new dish</h2>
          <form className="form-card mt-4" encType="multipart/form-data" method="POST">
            <div className="row justify-content-between text-left m-4">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-control-label px-3"
                >
                  Meal name
                </label>
                <input
                  type="text"
                  value={inpval.name}
                  onChange={setdata}
                  name="meal_name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal detail
                </label>
                <input
                  type="text"
                  value={inpval.email}
                  onChange={setdata}
                  name="meal_descr"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            {/* -- */}
            <div className="row justify-content-between text-left m-4">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal price
                </label>
                <input
                  type="number"
                  value={inpval.age}
                  onChange={setdata}
                  name="meal_price"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal availabilty
                </label>
                <small style={{color:"lightsalmon"}}>A/NA</small>
                <input
                  type="text"
                  value={inpval.mobile}
                  onChange={setdata}
                  name="meal_avail"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            <div className="row justify-content-between text-left m-4">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal Time
                </label>
                <input
                  type="number"
                  value={inpval.price}
                  onChange={setdata}
                  name="meal_time"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
              <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal Rating
                </label>
                
                <input
                  type="text"
                  value={inpval.rate}
                  onChange={setdata}
                  name="meal_famous"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            <div className="row justify-content-between text-center m-4">
            <div className="form-group col-sm-6 flex-column d-flex">
            <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal Image
                </label>
               
                <input
                  type="file"
                  // value={inpval.img}
                  // onChange={setdata}
                  name="meal_img"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
              <label
                  htmlFor="exampleInputPassword1"
                  className="form-control-label px-3"
                >
                  Meal Type
                </label> 
                <small style={{color:"lightsalmon"}}>Veg/Non-veg</small>
                <input
                  type="text"
                  value={inpval.type}
                  onChange={setdata}
                  name="meal_famous"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              </div>
            <div className="row justify-content-center">
              <button
                type="submit"
                onClick={addinpdata}
                className="btn btn-dark form-group col-sm-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};
export default Register;

import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import "./Register.css";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    meal_name: "",
    meal_descr: "",
    meal_price: 0,
    meal_avail: "",
  });
  // console.log(inpval);
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

    const { meal_name, meal_descr, meal_price, meal_avail } = inpval;
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
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      history.push("/");
      setUdata(data);
      console.log("Meal added");
    }
    // }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          {/* <NavLink to="/">Home</NavLink> */}
          <h2>Enter a new dish</h2>
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
                {/* <small>- A / NA</small> */}
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
            <div class="row justify-content-center">
              <button
                type="submit"
                onClick={addinpdata}
                className="btn btn-primary form-group col-sm-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;

import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";
import Navbaar from "./Navbaar";
import Sidenav from "./Sidenav";

const Edit = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const { updata, setUPdata } = useContext(updatedata);

  const history = useHistory("");

  const [inpval, setINP] = useState({
    meal_title: "",
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

  const { id } = useParams("");
  // console.log(id);

  const getdata = async () => {
    // console.log(id);
    const res = await fetch(`http://localhost:3001/single_meal/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("dataas");
    const data = await res.json();
    console.log(data);
    console.log("data");

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setINP(data[0]);
      // console.log(setINP(data[0]));
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      meal_title,
      meal_descr,
      meal_price,
      meal_avail,
      meal_time,
      meal_famous,
    } = inpval;
    console.log(meal_title);
    console.log(meal_descr);
    console.log(meal_price);
    const res2 = await fetch(`http://localhost:3001/update_meal/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        meal_title,
        meal_descr,
        meal_price,
        meal_avail,
        meal_time,
        meal_famous,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Fill the data!");
    } else {
      history.push("/AdminHome");
      setUPdata(data2);
    }
  };

  return (
    <>
      <Navbaar />
      <div className="d-flex">
        <Sidenav />
        <div className="container-fluid px-1 py-5 mx-auto">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
              <h2 className="text-uppercase m-2 title">Update a dish</h2>
              <form className="form-card mt-4">
                <div className="row justify-content-between text-left m-4">
                  <div className="orm-group col-sm-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-control-label px-3"
                    >
                      Meal Name
                    </label>
                    <input
                      type="text"
                      value={inpval.meal_title}
                      onChange={setdata}
                      name="meal_title"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="orm-group col-sm-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-control-label px-3"
                    >
                      Meal Description
                    </label>
                    <input
                      type="email"
                      value={inpval.meal_descr}
                      onChange={setdata}
                      name="meal_descr"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left m-4">
                  <div className="orm-group col-sm-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-control-label px-3"
                    >
                      Meal price
                    </label>
                    <input
                      type="text"
                      value={inpval.meal_price}
                      onChange={setdata}
                      name="meal_price"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="orm-group col-sm-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-control-label px-3"
                    >
                      Availability
                    </label>
                    <input
                      type="text"
                      value={inpval.meal_avail}
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
                      value={inpval.meal_time}
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
                    {/* <small>- A / NA</small> */}
                    <input
                      type="text"
                      value={inpval.meal_famous}
                      onChange={setdata}
                      name="meal_famous"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-center m-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-control-label px-3"
                  >
                    Meal Image
                  </label>
                  {/* <small>- A / NA</small> */}
                  <input
                    type="file"
                    value={inpval.img}
                    onChange={setdata}
                    accept="image/*"
                    name="meal_img"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button
                  type="submit"
                  onClick={updateuser}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;

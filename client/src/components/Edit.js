import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";

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

    const { meal_title, meal_descr, meal_price, meal_avail } = inpval;
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
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Fill the data!");
    } else {
      history.push("/");
      setUPdata(data2);
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          {/* <NavLink to="/">home2</NavLink> */}
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
            {/* <div class="orm-group col-sm-6 flex-column d-flex">
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
  );
};

export default Edit;

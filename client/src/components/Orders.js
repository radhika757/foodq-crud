import React, { useState } from "react";
import Navbaar from "./Navbaar";
import axios from "axios";
import { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Sidenav from "./Sidenav";
import { Table } from "react-bootstrap";


  
const Orders = () => {
  const [getOrders, setGetOrders] = useState([]);

  const getAllOrders = async () => {
    // console.log('callked');
    await axios.get("http://localhost:3001/get_order").then((res) => {
      console.log(res.data);
      setGetOrders(res.data);
    });
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Navbaar />
      <div className="d-flex">
        <Sidenav />
        <div>
          <h2 className="text-center m-4">Orders</h2>
          <Table striped bordered hover style={{width:'70em'}} className="table m-4">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Address</th>
                <th scope="col">Customer Number</th>
                <th scope="col">Order Status</th>
                <th scope="col">Order Date/Time</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {getOrders.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>

                      <td>{element.order_name}</td>
                      <td>{element.order_address}</td>
                      <td> {element.order_num} </td>
                      <td>{element.order_status}</td>
                      <td>{element.order_time}</td>
                      <td className="d-flex ">
                        {/* <NavLink to={`edit/${element.meal_id}`}>
                                <button className="btn btn-primary btn-sm m-2">
                                  <CreateIcon />
                                </button>
                              </NavLink> */}
                        <button
                          className="btn btn-danger btn-sm p-2"
                          // onClick={() => deleteuser(element.meal_id)}
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
        </div>
      </div>
    </>
  );
};

export default Orders;

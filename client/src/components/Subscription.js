import React, { useState } from "react";
import { useEffect } from "react";
import Navbaar from "./Navbaar";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Sidenav from "./Sidenav";
import { Table } from "react-bootstrap";

const Subscription = () => {
  const [getSubcriptions, setGetSubscriptions] = useState([]);

  const getSubsptn = async () => {
    await axios.get("http://localhost:3001/all_subscriptions").then((res) => {
      console.log(res.data);
      setGetSubscriptions(res.data);
    });
  };

  useEffect(() => {
    getSubsptn();
  }, []);

  return (
    <React.Fragment>
      <Navbaar />
      <div className="d-flex">
        <Sidenav />
        <div>
          <h2 className="text-center m-4">Subscriptions</h2>
          <Table striped bordered hover style={{width:'70em'}} className="table m-4">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Member Name</th>
                <th scope="col">Member Number</th>
                <th scope="col">Member Mail</th>
                <th scope="col">Member address</th>
                <th scope="col">Member Reg Date</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {getSubcriptions.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>

                      <td>{element.m_name}</td>
                      <td>{element.m_num}</td>
                      <td> {element.m_mail} </td>
                      <td>{element.m_add}</td>
                      <td>{element.reg_date}</td>
                      <td className="d-flex justify-content-center">
                        <button
                          className="btn btn-danger btn-sm"
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
    </React.Fragment>
  );
};

export default Subscription;

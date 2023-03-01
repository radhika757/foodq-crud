const express = require("express");
const { connect } = require("../db/connection");
const router = new express.Router();
const connection = require("../db/connection");
const multer = require('multer');


router.get("/", (req, res) => {
  connection.query("SELECT * FROM meals", (err, result) => {
    if (err) {
      res.send("Error", err);
      // res.status(422).json("No Meals available");
    } else {
      res.send(result);
      // res.status(201).json(result);
    }
  });
});

// get meal data api
router.get("/getdata", (req, res) => {
  connection.query("SELECT * FROM meals", (err, result) => {
    if (err) {
      res.status(422).json("No Meals available");
    } else {
      res.status(201).json(result);
    }
  });
});

// new meal data
router.post("/create", (req, res) => {
  const { meal_name, meal_descr, meal_price, meal_avail } = req.body; //obj destructuring.
  console.log(meal_name);

  try {
    console.log("in try loop");
    const dataInsert =
      "INSERT INTO meals (meal_title, meal_descr, meal_price, meal_avail) VALUES (?,?,?,?)";
    connection.query(
      dataInsert,
      [meal_name, meal_descr, meal_price, meal_avail],
      (err, result) => {
        console.log(result);
        if (err) {
          console.log("error after insert loop" + err);
          res.send(err);
        } else {
          res.status(201).json(req.body);
        }
      }
    );
  } catch (error) {
    res.status(422).json("else loop of insert", error);
  }
});

// Delete meal api
router.delete("/delete_meal/:id", (req, res) => {
  // get id from params
  const { id } = req.params;
  connection.query("DELETE FROM meals WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(422).json("Data not found");
    } else {
      res.status(201).json(result);
    }
  });
});

// get single meal
router.get("/single_meal/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  connection.query("SELECT * FROM meals WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("Oops! Something went wrong", err);
    } else {
      res.status(201).json(result);
    }
  });
});

// update meal api
router.patch("/update_meal/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body; //updated data 
  console.log(data);
  connection.query(
    "UPDATE meals SET ? WHERE id = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "Data not updated" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});

// Admin access

// new admin
router.post("/add_admin", (req, res) => {
  const admin_name = req.body.name;
  const admin_email = req.body.email;
  const admin_pass = req.body.pass;
  // const date = Date();
  // console.log(date);
  console.log(admin_name);
  const new_admin =
    "INSERT INTO admin_access (admin_name, admin_email ,admin_pass) VALUES (?,?,?)";
  connection.query(
    new_admin,
    [admin_name, admin_email, admin_pass],
    (err, result) => {
      console.log(result);
    }
  );
});

// get admin api
router.get("/getadmin", (req, res) => {
  connection.query("SELECT * FROM admin_access", (err, result) => {
    if (err) {
      res.status(422).json("No Data available");
    } else {
      res.status(201).json(result);
    }
  });
});

module.exports = router;

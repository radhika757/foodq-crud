const express = require("express");
const { connect, query } = require("../db/connection");
const router = new express.Router();
const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const logout = require("express-passport-logout");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

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

// register admin
router.post("/add_admin", (req, res) => {
  const admin_name = req.body.name;
  const admin_email = req.body.email;
  const admin_pass = req.body.pass;
  // const date = Date();
  // console.log(date);

  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  console.log(id);

  bcrypt.hash(admin_pass, 10, (err, pass) => {
    if (err) throw err;
    try {
      connection.query(
        "INSERT INTO admin_access VALUES (?,?,?,?)",
        [id, admin_email, pass, admin_name],
        (err, result) => {
          if (err) throw err;
          console.log(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
});

// login admin api

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Query the database for the user with the given email
        console.log(email);
        await connection.execute(
          "SELECT * FROM admin_access WHERE admin_email = ?",
          [email],
          (err, rows) => {
            if (err) return done(err);
            if (!rows.length) {
              return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }
            bcrypt.compare(password, rows[0].admin_pass, (err, match) => {
              console.log(match);
              if (!match) return done(null, false);
              return done(null, rows[0]);
            });
          }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);

router.post(
  "/login",
  passport.authenticate("local-login", { session: false }),

  (req, res) => {
    res.json(req.user);
  }
);

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

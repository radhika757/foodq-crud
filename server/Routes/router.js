const express = require("express");
const { connect, query } = require("../db/connection");
const router = new express.Router();
const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const logout = require("express-passport-logout");
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
  try {
    // console.log("in try loop");
    const dataInsert =
      "INSERT INTO meals (meal_title, meal_descr, meal_price, meal_avail) VALUES (?,?,?,?)";
    connection.query(
      dataInsert,
      [meal_name, meal_descr, meal_price, meal_avail],
      (err, result) => {
        // console.log(result);
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
  console.log(id);
  console.log("id");
  connection.query("DELETE FROM meals WHERE meal_id = ?", id, (err, result) => {
    if (err) {
      res.status(422).json("Data not found");
      console.log(err);
    } else {
      res.status(201).json(result);
    }
  });
});
//all-meals
router.get("/all-meals", (req, res) => {
  connection.query("SELECT * FROM meals", (err, result) => {
    if (err) {
      res.status(422).json("Oops ! Something went wrong", err);
    } else {
      res.status(201).json(result);
    }
  });
});

// get single meal
router.get("/single_meal/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log("id");

  connection.query(
    "SELECT * FROM meals WHERE meal_id = ? ",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("Oops! Something went wrong", err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

// update meal api
router.patch("/update_meal/:id", (req, res) => {
  console.log("up");
  const { id } = req.params;
  const data = req.body; //updated data
  console.log(data);
  connection.query(
    "UPDATE meals SET ? WHERE meal_id = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "Data not updated" });
        console.log(err);
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

  function generateHashPassword(admin_pass) {
    const saltRounds = 8;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(admin_pass, salt);
    return hash;
  }
  //hashing the password
  const hashedPassword = generateHashPassword(admin_pass);
  const query_admin =
    "INSERT INTO admin_access (admin_name, admin_email, admin_pass) VALUES (?,?,?)";
  try {
    console.log(admin_name);
    console.log(admin_email);
    console.log(admin_pass);
    console.log(hashedPassword);
    connection.query(
      query_admin,
      [admin_name, admin_email, hashedPassword],
      (err, result, res, req) => {
        if (err) throw err;
        console.log(result);
        res.send(201).json("New Admin created");
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// });

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
        console.log(password);
        await connection.execute(
          "SELECT * FROM admin_access WHERE admin_email = ?",
          [email],
          (err, rows) => {
            if (!rows.length) {
              res.send("No match");
              console.log("No match");
              return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }
            // hashing and comparing passwords
            bcrypt.compare(password, rows[0].admin_pass, (err, match) => {
              if (!match) {
                console.log(err);
                console.log(match);
                return done(null, false);
              }
              return done(null, rows[0]);
            });
          }
        );
      } catch (err) {
        // console.log('catch');
        return done(err);
      }
    }
  )
);

router.post(
  "/login",
  passport.authenticate("local-login", { session: false }),
  (req, res) => {
    res.json({ user: req.user, isAuthenticated: true });
  }
);
router.get("/logout", (req, res) => {
  req.logout();
});

router.get("/getadmin", (req, res) => {
  // console.log('req');
  connection.query("SELECT * FROM admin_access", (err, result) => {
    if (err) {
      console.log("err");
      res.status(422).json("No Data available");
    } else {
      res.status(201).json(result);
    }
  });
});

// Api for getting top 4 meals
router.get("/famous_meals", (req, res) => {
  connection.query(
    "SELECT * FROM meals ORDER BY meal_famous DESC LIMIT 4",
    (err, result) => {
      if (err) {
        res.status(422).json("No data available");
      } else {
        res.status(201).json(result);
      }
    }
  );
});

// order api
router.post("/create_order", (req, res) => {
  const orderName = req.body.client_name;
  const orderAdd = req.body.client_add;
  const orderNum = req.body.client_num;
  console.log(orderName);
  console.log(orderAdd);
  console.log(orderNum);
  const newOrder =
    "INSERT INTO orders (order_name, order_address, order_num) VALUES (?,?,?)";
  connection.query(newOrder, [orderName, orderAdd, orderNum], (err, result) => {
    if (err) {
      res.status(422).json("Order not placed");
      console.log(err);
    } else {
      res.status(201).json(result);
    }
  });
});

// new member api
router.post("/new_member", (req, res) => { 
  const memberName = req.body.name;
  const number = req.body.num;
  const mail = req.body.email; 
  const address = req.body.add;
  const reg_date = new Date(); 
  // const con_date = reg_date.toLocaleDateString();
  const formattedDate = reg_date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  console.log(reg_date, formattedDate);
  const newRegister =
    "INSERT INTO registers (m_name, m_num, m_mail, m_add, reg_date) VALUES (?,?,?,?,?)";
  connection.query(
    newRegister,
    [memberName, number, mail, address, reg_date],
    (err, result) => { 
      if (err) {
        res.status(422).json("Please try again");
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});
module.exports = router;

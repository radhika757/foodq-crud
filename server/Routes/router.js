const express = require("express");
const { connect, query } = require("../db/connection");
const router = new express.Router();
const connection = require("../db/connection");
const bcrypt = require("bcrypt");
//passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require('express-session');
const { logout } = require("express-passport-logout");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const multer = require("multer");
const fs = require("fs-extra");
const upload = multer({ dest: "uploads/" });

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
      console.log(result);
    }
  });
});

// get veg meals
router.get("/meals/veg", (req, res) => {
  connection.query(
    "SELECT * FROM meals WHERE meal_type='veg'",
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

// total veg meals
router.get("/get_veg_count", (req, res) => {
  const query = "SELECT COUNT(*) as count FROM meals WHERE meal_type='veg' ";
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    const count = results[0].count; 
    console.log(`Total number of meals: ${count}`);
    res.status(201).json(count);
  });
});

//get total meal counts
router.get("/get_meal_count", (req, res) => {
  const query = "SELECT COUNT(*) as count FROM meals";
  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    const count = results[0].count;
    console.log(`Total number of meals: ${count}`);
    res.status(201).json(count);
  });
});

// new meal data
router.post("/create", (req, res) => {
  const {
    meal_name,
    meal_descr,
    meal_price,
    meal_avail,
    meal_time,
    meal_rate,
    meal_type
  } = req.body; //obj destructuring.
  // const { filename } = req.file;
  // console.log(filename);
  try {
    console.log(meal_name);
    const dataInsert =
      "INSERT INTO meals (meal_title, meal_descr, meal_price, meal_avail, meal_famous, meal_time, meal_type) VALUES (?,?,?,?,?,?,?)";
    connection.query(
      dataInsert,
      [meal_name, meal_descr, meal_price, meal_avail, meal_rate, meal_time,meal_type],
      (err, result) => {
        // console.log(result);
        if (err) {
          console.log(err);
          res.send(err);
          console.log(err);
        } else {
          res.status(201).json(req.body);
        }
      }
    );
  } catch (error) {
    res.status(422).json("else loop of insert", error);
  }
});
console.log(`${__dirname}./`);

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
        console.log(result);
      }
    }
  );
});

// Admin del
router.delete("/delete_admin/:id", (req, res) => {
  // get id from params
  const { id } = req.params;
  console.log(id);
  console.log("id");
  connection.query(
    "DELETE FROM admin_access WHERE admin_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("Data not found");
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

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

    connection.query(
      query_admin,
      [admin_name, admin_email, hashedPassword],
      (err, result, res, req) => {
        if (err) throw err;
        // console.log(result);
        res.send(201).json("New Admin created");
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// });

// login admin api
// passport.use(
//   "local-login",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },

//     async (email, password, done) => {
//       // console.log(email);
//       // console.log(password);
//       try {
//         // Query the database for the user with the given email
//         const { results: rows } = await connection.execute(
//           "SELECT * FROM admin_access WHERE admin_email = ?",
//           [email]
//         );
//         // console.log(rows);
//         if (!rows) {
//           // console.log("rows");
//           return done(null, false, { message: "User data missing" });
//         }
//         // compare the password with the hashed password stored.
//         if (rows.length === 0) {
//           // console.log("length");
//           return done(null, false, { message: "No match found" });
//         }
//         try {
//           const match = await bcrypt.compare(password, rows[0].admin_pass);
//           if (!match) {
//             console.log(err);
//             return done(null, false, { message: "Incorrect password" });
//           }
//           return done(null, rows[0]);
//         } catch (err) {
//           return done(err);
//         }
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local-login", { session: false }, (err, user) => {
//     if (err || !user) {
//       console.log(err);
//       console.log(user);
//       return res.status(401).json({

//         message: "Authentication failed",
//         user: user,
//         isAuthenticated: false,
//       });
//     }

//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
//       return res.json({
//         user: user,
//         token: token,
//         isAuthenticated: true,
//       });
//     });
//   })(req, res, next);
// });

// router.post(
//   "/login",
//   passport.authenticate("local-login", { session: false }),
//   (req, res) => {
//     res.json({ user: req.user, isAuthenticated: true });
//   }
// );

router.use(passport.session({
  secret:'mykey',
  resave:false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

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
            // call back function
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
router.post("/login", (req, res, next) => {
  passport.authenticate("local-login", { session: false }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
        isAuthenticated: false,
      });
    }

    if (!user) {
      console.log("Authentication failed");
      return res.status(401).json({
        message: "Authentication failed",
        isAuthenticated: false,
      });
    }

    console.log("Authentication successful");
    console.log(user);
    // console.log( process.env.JWT_SECRET); error => secret or private key must have a value.  constant across all authentications,
    // while deploying your project , use env variable only ----------
    const token = jwt.sign(
      { id: user.id },
      "GQyVut3ddMz86fM477oet7ZUU0kN2GoPnwY3wOXc6QLzzK9+So5Nn0f0nNTpqfWHstiXG4HstpcrbA1JIM8RIZfISegvh4fRVGaS4t+qrkmwEaP/MZpinua2gTqZp7ryvHJ0tCqswRbzJHwo6o2LjfzSdGYYrElTGtGJhifpDk4="
    );
    return res.json({
      user: user,
      token: token,
      isAuthenticated: true,
    });
  })(req, res, next);
});

//logout
router.post("/logout", function (req, res, next) {
  console.log("hi");
  req.logout();
  res.redirect("/login");
  // req.logout(function (err) {
  //   console.log(err);
  //   if (err) {
  //     console.log(err);
  //     return next(err);
  //   }
  //   res.redirect("/login");
  // });
});

// router.get("/logout",logout, function (req,res) {
//   res.status(401).json({
//     message: "Logged out successfully",
//     isAuthenticated: false,
//   });
//   res.redirect("/login");
// });

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

// get orders
router.get("/get_order", (req, res) => {
  connection.query(
    "SELECT * FROM orders ORDER BY order_id DESC",
    (err, result) => {
      console.log("loop+");
      if (err) {
        console.log("if");
        res.status(422).json("No orders available");
        console.log(err);
      } else {
        console.log("else");
        res.status(201).json(result);
      }
    }
  );
});

// delete order
router.delete("/delete_order/:id", (req, res) => {
  // get id from params
  const { id } = req.params;
  console.log(id);
  console.log("id");
  connection.query(
    "DELETE FROM orders WHERE order_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("Data not found");
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

// new member api
router.post("/new_member", (req, res) => {
  const memberName = req.body.name;
  const number = req.body.num;
  const mail = req.body.email;
  const address = req.body.add;
  const reg_date = new Date();
  // const con_date = reg_date.toLocaleDateString();
  const formattedDate = reg_date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
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

// get memebers api
router.get("/all_subscriptions", (req, res) => {
  connection.query(
    "SELECT * FROM registers ORDER BY member_id DESC",
    (err, result) => {
      if (err) {
        res.status(422).json("No records available");
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

  module.exports = router;

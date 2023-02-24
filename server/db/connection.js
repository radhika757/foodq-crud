const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "foodq_crud",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Db connected");
  }
});

module.exports = connection;
const mysql = require("mysql");

const mysqlDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "final_booking_system",
});

mysqlDB.connect(function (err) {
  if (err) return console.log(err.message);
  console.log("[⚡️] - mysql connected...");
});

module.exports = mysqlDB

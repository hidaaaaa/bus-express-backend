'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
host: 'localhost',
  user: 'root',
  password: '',
  database: 'final_booking_system'
});
// connect to database
connection.connect(function(err) {
    if (err) return console.log(err)
	// console.log('Database Connected !!!');
});

module.exports = connection;
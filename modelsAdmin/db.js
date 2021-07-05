'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
host: 'sql5.freesqldatabase.com	',
  user: 'sql5423057',
  password: 'mnbijL5xkr',
  database: 'sql5423057'
});
// connect to database
connection.connect(function(err) {
    if (err) return console.log(err)
	// console.log('Database Connected !!!');
});

module.exports = connection;
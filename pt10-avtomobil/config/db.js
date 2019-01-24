var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'database'
});

connection.connect();

console.log("Connection Success!");

module.exports = connection;
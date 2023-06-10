const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
	host: "localhost",

	user: "root",

	password: "password1234",

	database: "company_db",
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to the company_db database.");
});

module.exports = connection;

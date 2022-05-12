const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to DB
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, err => {
	if (err) return console.error(err.message);
	else {
		console.log('successful connection');
	}
});

//Create tables
// language=SQL format=false
sql = `CREATE TABLE cloneTemplate(id INTEGER PRIMARY KEY, username, templateRepo)`;
db.run(sql);

//Drop table
// db.run("DROP TABLE users");

//Insert data into tables
function insertCloneTemplate(username, templateRepo) {
	// language=SQL format=false
	sql = `INSERT INTO cloneTemplate(username, templateRepo) VALUES (?, ?)`;
	db.run(sql, [username, templateRepo], err => {
		if (err) return console.error(err.message);
	});
}

//Update table data
function updateTableData(tableName = 'cloneTemplate', columnName, rowID, newValue) {
	// language=SQL format=false
	sql = `UPDATE ${tableName} SET ${columnName} = ${newValue} WHERE id = ${rowID}`;
	db.run(sql, ['Jake', 1], err => {
		if (err) return console.error(err.message);
	});
}

//Delete table data
function deleteTableData() {
	// language=SQL format=false
	sql = `DELETE FROM users WHERE id = ?`;
	db.run(sql, [1], err => {
		if (err) return console.error(err.message);
	});
}

//Query table data
function queryTableData(tableName = 'cloneTemplate') {
	// language=SQL format=false
	sql = `SELECT * FROM ${tableName}`;
	db.all(sql, [], (err, rows) => {
		if (err) return console.error(err.message);
		rows.forEach(row => {
			console.log(row);
		});
	});
}

// module.exports = { function here };

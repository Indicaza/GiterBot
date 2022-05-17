const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to DB
	const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, err => {
		if (err) return console.error(err.message); else {
			console.log('sqlite3 connection succeeded');
		}
	});

//Create tables
// language=SQL format=false
// sql = `CREATE TABLE cloneTemplate(id INTEGER PRIMARY KEY, actionNickname, username, templateRepo)`;
// db.run(sql);

//Drop table
// db.run("DROP TABLE cloneTemplate");

//Insert data into tables
function insertTableData(actionNickname, username, templateRepo, tableName = 'cloneTemplate') {
	sql = `INSERT INTO ${tableName}(actionNickname, username, templateRepo) VALUES (?, ?, ?)`;
	db.run(sql, [actionNickname, username, templateRepo], err => {
		if (err) return console.error(err.message);
	});
}

//Update table data
function updateTableData(columnName, rowID, newValue, tableName = 'cloneTemplate') {
	// language=SQL format=false
	sql = `UPDATE ${tableName} SET ${columnName} = ${newValue} WHERE id = ${rowID}`;
	db.run(sql,  err => {
		if (err) return console.error(err.message);
	});
}

// function updateID(tableName = 'cloneTemplate') {
// 	sql = `UPDATE $TABLE ${tableName} SET`
// }

//Delete table data
function deleteRowData(id, tableName = 'cloneTemplate') {
	// language=SQL format=false
	sql = `DELETE from ${tableName} where id = ${id}`;
	db.run(sql, err => {
		if (err) return console.error(err.message);
	});
}

//Returns truthy if data EXISTS TODO The limitations are REAL!!!
// function checkDuplicateTableData(value, tableName = 'cloneTemplate') {
// 	sql = `SELECT ${value} FROM ${tableName} WHERE ${value} = ${value}` ;
// 	db.run(sql, err => {
// 		if (err) return console.error(err.message);
// 		else return sql;
// 	});
// }

//Returns falsy if table is empty TODO This is absolute trash!!!  Need async
// function checkTableEmpty(tableName = 'cloneTemplate') {
// 	sql = `SELECT count(*) from ${tableName}`
//     db.all(sql, (err, result) => {
// 		if (err) return console.error(err.message);
// 		else return result;
// 	})
// }
// console.log(checkTableEmpty())

//Prints all table data
function queryTableData(tableName = 'cloneTemplate') {
		sql = `SELECT * FROM ${tableName}`;
		db.all(sql, (err, rows) => {
			if (err) return console.error(err.message);
			rows.forEach(row => {
				console.log(row);
			});
		});
}

queryTableData()

module.exports = {insertTableData, updateTableData, deleteRowData, queryTableData,  };

//
//
//
const {db} = require('../schema/database.js');


function listAllTables() {
	return new Promise((resolve, reject) => {
		let sql = `PRAGMA table_list`
		db.all(sql, (err, result) => {
			if (err) reject(err)
			resolve(result)
		})
	})
}

// Checks column for value and returns bool
async function checkColumn(columnValue, columnName, tableName) {
	return new Promise((resolve, reject) => {
		let sql = `SELECT ${columnName} FROM ${tableName} WHERE EXISTS (SELECT * FROM ${tableName} WHERE ${columnName} = "${columnValue}")`
		db.get(sql, (err, result) => {
			if (err) reject(err.message);
			resolve(Boolean(result))
		})
	})
}

//TODO just check once before entering a menu loop.
//Returns true if table exists
async function checkTableExists(tableName) {
	return await new Promise((resolve, reject) => {
		let sql = `SELECT name FROM sqlite_master WHERE type = 'table' AND name = "${tableName}";`
		db.all(sql, (err, results) => {
			if (err) reject(err);
			resolve(Boolean(results.length))
		})
	})
}

//TODO test for single row error
//Returns number of rows if table exists, else returns false
async function countTableRows(tableName) {
	if (await checkTableExists(tableName) === true) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT count(*) from ${tableName};`
			db.all(sql, (err, result) => {
				if (err) reject(err.message);
				resolve(Object.values(result[0])[0])
			});
		});
	} else return false
}

//Checks ID for value and returns bool
async function checkID(value, tableName) {
	if (await countTableRows(tableName) >= value && value > 0) {
		return true;
	} else if (value === 0) {
		console.log("checkID = 0")
		return 0;
	} else {
		console.log("checkID = false")
		return false;
	}
}




module.exports = {
	listAllTables,
	checkTableExists,
	checkID,
	checkColumn,
	countTableRows,
};
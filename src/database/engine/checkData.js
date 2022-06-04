//
//
//
const {db} = require('../schema/database.js');


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

// Checks column for value and returns bool
async function checkColumn(columnValue, columnName = 'actionNickname', tableName = 'cloneTemplate') {
	return new Promise((resolve, reject) => {
		let sql = `SELECT ${columnName} FROM ${tableName} WHERE EXISTS (SELECT * FROM ${tableName} WHERE ${columnName} = "${columnValue}")`
		db.get(sql, (err, result) => {
			if (err) reject(err.message);
			resolve(Boolean(result))
		})
	})
}

//Checks ID for value and returns bool
async function checkID(value, tableName = 'cloneTemplate') {
	if (await countTableRows(tableName) >= value && value > 0) {
		return true;
	} else if (value === 0) {
		return 0;
	} else return false;
}

//Returns number of rows if table exists, else returns false
async function countTableRows(tableName = 'cloneTemplate') {
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


module.exports = {
	checkTableExists,
	checkID,
	checkColumn,
	countTableRows,
};
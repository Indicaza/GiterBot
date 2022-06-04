//
//
//
const {db} = require('../schema/database.js');


//======================================================================================================================
//Prints all table data
function queryTableData(tableName = 'cloneTemplate') {
	let sql = `SELECT * FROM ${tableName};`;
	db.all(sql, (err, rows) => {
		if (err) return console.error(err.message);
		rows.forEach(row => {
			console.log(row);
			return row;
		})
	})
}

//======================================================================================================================
//Checks column for value and returns bool TODO <=== OPTIMIZE!!!
async function checkColumn(columnValue, columnName = 'actionNickname', tableName = 'cloneTemplate') {
	try {
		let fromTable = () => {
			return new Promise((resolve, reject) => {
				if (typeof columnValue !== 'string') reject(TypeError('Input must be a string'));
				let sql = `SELECT 1 FROM ${tableName} where ${columnName} = "${columnValue}";`;
				db.all(sql, (err, result) => {
					if (err) reject(err.message);
					resolve(result);
				});
			});
		};
		let emptyCheck = await fromTable();
		let transformValue = JSON.stringify(emptyCheck);
		let endValue = parseInt(transformValue.length)
		if (endValue === 2) {
			return false;
		}
		if (endValue > 2) {
			return true;
		}
	} catch (err) {console.error(err)}
}

//======================================================================================================================
//Checks ID for value and returns bool
async function checkID(value, tableName = 'cloneTemplate') {
	if (await countTableRows(tableName) >= value && value > 0) {
		return true;
	} else if (value === 0) {
		return 0;
	} else return false;
}

//======================================================================================================================
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

//======================================================================================================================
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
	} else {
		return false;
	}
}


module.exports = {
	queryTableData,
	checkID,
	checkColumn,
	checkTableExists,
	countTableRows
};
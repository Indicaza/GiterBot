//
//
//
const {db} = require('../models/database.js');


//======================================================================================================================
//Prints all table data sync
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
//Checks column for value and returns bool
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
async function checkID(idValue, tableName = 'cloneTemplate') {
	try {
		let fromTable = () => {
			return new Promise((resolve, reject) => {
				if (typeof idValue !== 'number') reject(TypeError('Input must be a number'));
				let sql = `SELECT * FROM ${tableName} where id = ${idValue};`
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
//Returns true if table exists
async function checkTableExists(tableName) {
	return await new Promise((resolve, reject) => {
		let sql = `SELECT name FROM sqlite_master WHERE type = 'table' AND name = "${tableName}";`
		db.all(sql, (err, results) => {
			if (err) reject(err);
			// resolve(results);
			resolve(Boolean(results.length))
		})
	})
}

//======================================================================================================================
//Returns true if table is empty
async function checkTableRows(tableName = 'cloneTemplate') {
	try {
		let fromTable = () => {
			return new Promise((resolve, reject) => {
				let sql = `SELECT count(*) from (select 0 from ${tableName} limit 1);`;
				db.all(sql, (err, result) => {
					if (err) reject(err.message);
					resolve(result);
				});
			});
		};
		let emptyCheck = await fromTable();
		let transformValue = JSON.stringify(emptyCheck);
		let stringMagic = transformValue.charAt(13);
		let schrodingersValue = parseInt(stringMagic);
		if (schrodingersValue === 1) {
			return false;
		}
		if (schrodingersValue === 0) {
			return true;
		}
	} catch (err) {return true}
}


module.exports = {
	queryTableData,
	checkID,
	checkColumn,
	checkTableExists,
	checkTableRows
};
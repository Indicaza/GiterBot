const sqlite3 = require('sqlite3').verbose();
const {checkDuplicate, convertString} = require('./functions');
let sql;

//connect to DB
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, err => {
	if (err) return console.error(err.message); else {
		console.log('sqlite3 connection succeeded');
		return db;
	}
});


//Create tables (c1 = column1)
function createTable(newTableName = '"cloneTemplate"', c1 = '"actionNickname"', c2 = '"username"', c3 = '"templateRepo"') {
	sql = `CREATE TABLE ${newTableName}
           (
               id INTEGER PRIMARY KEY,
               ${c1} TEXT,
               ${c2} TEXT,
               ${c3} TEXT
           )`;
	db.run(sql);
}

//Drop table
function dropTable(tableName = 'cloneTemplate') {
	db.run(`DROP TABLE ${tableName}`);
}

//Insert data into tables
async function insertTableData(actionNickname, username, templateRepo, tableName = 'cloneTemplate') {
		sql = `INSERT INTO ${tableName}(actionNickname, username, templateRepo) VALUES (?, ?, ?)`;
		await db.run(sql, [actionNickname, username, templateRepo], err => {
			if (err) return console.error(err.message);
			else return console.log(`${actionNickname} stored in ${tableName}`);
		});
}

//Update table data
function updateTableData(columnName, rowID, newValue, tableName = 'cloneTemplate') {
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

//Returns truthy if data EXISTS
function checkDuplicateTableData(value, tableName = 'cloneTemplate') {
	sql = `SELECT ${value} FROM ${tableName} WHERE ${value} = ${value}` ;
	db.run(sql, err => {
		if (err) return console.error(err.message);
		else return sql;
	});
}


//Prints all table data
async function queryTableData(tableName = 'cloneTemplate') {
		sql = `SELECT * FROM ${tableName}`;
		await db.all(sql, (err, rows) => {
			if (err) return console.error(err.message);
			rows.forEach(row => {
				console.log(row);
				return row;
			})
		})
}


async function saveTemplate(actionNickname, username, templateRepo) {
	try {
		insertTableData(`${actionNickname}`, `${username}`, `${templateRepo}`)
	} catch (err) {
		return console.error(err.message);
	} finally {
		queryTableData('cloneTemplate')
	}
}


// async function actionRowData(actionNickname, tableName = 'cloneTemplate') {
// 	let fromTableRow = () => {
// 		return new Promise((resolve, reject) => {
// 			sql = `SELECT * FROM ${tableName} WHERE actionNickname = '${actionNickname}'`;
// 			db.all(sql, (err, result) => {
// 				if (err) reject(err.message);
// 				resolve(result);
// 			})
// 		})
// 	}
// 	let actionData = await fromTableRow()
// 	return async function(actionData) {
// 		console.log(actionData, typeof actionData);
// 		return JSON.stringify(actionData);
//
// 	}
// }

async function getRowData(actionNickname, tableName = 'cloneTemplate') {
		return new Promise((resolve, reject) => {
			sql = `SELECT * FROM ${tableName} WHERE actionNickname = '${actionNickname}'`;
			db.all(sql, (err, result) => {
				if (err) reject(err.message);
				resolve(result)})})}


async function makeObjArray(actionNickname, tableName = 'cloneTemplate') {
	await getRowData(actionNickname, tableName)
	let actionData = await getRowData()
	// console.log(actionData, typeof actionData);
	JSON.stringify(actionData);
	let objArray = { id: 1, actionNickname: 'a1', username: 'u1', templateRepo: 't1' };
	return objArray;
}


//======================================================================================================================
//CHONK Boi function
async function checkTableEmpty(tableName = 'cloneTemplate') {
	let fromTable = () => {
		return new Promise((resolve, reject) => {
			sql = `SELECT count(*) from (select 0 from ${tableName} limit 1)`;
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
	// console.log(emptyCheck, typeof emptyCheck)
	// console.log(transformValue, typeof transformValue)
	// console.log(stringMagic, typeof stringMagic)
	// console.log(schrodingersValue, typeof schrodingersValue)
	if (schrodingersValue === 1) {
		console.log('table is not empty');
		return true;
	}
	if (schrodingersValue === 0) {
		console.log('table is empty');
		return false;
	} else await console.log(schrodingersValue, typeof schrodingersValue);
}


// createTable()
// insertTableData('a3', 'u3', 't3',)
// deleteRowData(4, )

// dropTable()
// queryTableData()
// checkTableEmpty()

// let actionData3 = [];
// getRowData('a3',)
// actionData3 = makeObjArray(getRowData('a3',));
// console.log(actionData3, 'A3');



//todo
//Work on MVP DO NOT ADD ANYMORE FUNCTIONALITY
//Close and open the database within each function.


module.exports = {createTable, insertTableData, deleteRowData, queryTableData, saveTemplate};

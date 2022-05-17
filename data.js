const sqlite3 = require('sqlite3').verbose();
const {checkDuplicate, convertString} = require('./functions');
let sql;

//connect to DB
	const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, err => {
		if (err) return console.error(err.message); else {
			console.log('sqlite3 connection succeeded');
		}
	});

//Create tables (c1 = column1)
function createTable(newTableName = 'cloneTemplate', c1 = 'actionNickname', c2 = 'username', c3 = 'templateRepo') {
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

//Returns truthy if data EXISTS TODO The limitations are REAL!!!
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
	}
	finally {
		queryTableData('cloneTemplate')
	}
}

async function getDataFromAction(actionNickname, tableName = 'cloneTemplate') {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM ${tableName} WHERE actionNickname = '${actionNickname}'`, (err, rows) => {
			if (err) reject(err);
				resolve(rows);
		});
	})
}
(async () => {
	let actionData = await getDataFromAction('A1',);
	console.log(actionData)
})();

//Returns falsy if table is empty
function checkTableEmpty(tableName = 'cloneTemplate') {
	return new Promise((resolve, reject) => {
	sql = `SELECT count(*) from (select 0 from ${tableName} limit 1)`
	db.all(sql, (err, result) => {
		if (err) return console.error(err.message);
		resolve(result);
	})
	})
}
(async () => {
	let emptyCheck = await checkTableEmpty();
	let resultArray = Object.values(JSON.parse(JSON.stringify(emptyCheck)))
	// console.log(resultArray.length, typeof resultArray.length, typeof parseInt(resultArray.length))
	if (resultArray.length === 1) {
		console.log('table is not empty')
		return true; }
	if (resultArray.length === 0) {
		console.log('table is empty')
		return false;
	}
})();


// createTable('cloneTemplate')
insertTableData('a1', 'u1', 't1',)
// deleteRowData()
queryTableData()
// dropTable()


module.exports = {createTable, insertTableData, deleteRowData, queryTableData, saveTemplate};

//
//
//
const {db} = require('../models/database.js');


//======================================================================================================================
function createTable(newTableName = 'cloneTemplate') {
		let sql = `CREATE TABLE ${newTableName}(id INTEGER PRIMARY KEY);`
		db.run(sql)
}

//======================================================================================================================
//Variadic column generation
function addColumn(tableName, ...columns) {
	return new Promise((resolve, reject) => {
		if (columns.length <= 0) {
			reject()
		}
		if (columns.length >= 1) {
			columns.forEach(ele => {
				let columnArity = [];
				columnArity.unshift(`${ele} TEXT`)
				let restString = columnArity.join(',')
				let sql = `ALTER TABLE ${tableName}
					ADD ${restString};`
				db.run(sql, (err, result) => {
					if (err) reject();
				})
			})
		} resolve()
	})
}

//======================================================================================================================
//Insert data into specified table
async function insertCloneTemplateData(actionNickname, username, templateRepo, tableName = 'cloneTemplate') {
	let sql = `INSERT INTO ${tableName}(actionNickname, username, templateRepo) VALUES (?, ?, ?);`;
	await db.run(sql, [actionNickname, username, templateRepo], err => {
		if (err) return console.error(err.message);
		else return console.log(`${actionNickname} stored in ${tableName}`);
	});
}

//======================================================================================================================
function getDataByColumn(value, columnName, tableName) {
	return new Promise((resolve, reject)=>{
		let sql = `SELECT * FROM ${tableName} WHERE ${columnName} = '${value}';`
		db.serialize(()=>{
			db.get(sql, (err, rows)=>{
				if (err) reject(err)
				resolve(JSON.stringify(rows))
			})
		});
	})
}

async function printDataByColumn(value, columnName = 'actionNickname', tableName = 'cloneTemplate') {
	let rowData = await getDataByColumn(value, columnName, tableName).then(results => {return results})
	console.log(rowData)
}

//======================================================================================================================
function getDataByID(value, tableName) {
	return new Promise((resolve, reject)=>{
		let sql = `SELECT * FROM ${tableName} WHERE id = '${value}';`
		db.serialize(()=>{
			db.get(sql, (err, rows)=>{
				if (err) reject(err)
				resolve(JSON.stringify(rows))
			})
		});
	})
}

async function printDataByID(value, tableName = 'cloneTemplate') {
	let rowData = await getDataByID(value, tableName).then(results => {return results})
	console.log(rowData)
}

//======================================================================================================================
function getAllData(tableName) {
	return new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${tableName};`
		db.all(sql, (err, rows) => {
			if (err) reject(err)
			let table;
			rows.forEach(row => {
				table = table + JSON.stringify(row) + ';';
			})
			resolve(table.replace("undefined", ""));
		})
	})
}

async function printAllData(tableName = 'cloneTemplate') {
	let tableData = await getAllData(tableName).then(results => {return results})
	let filterTable = tableData.split(';')
	filterTable.pop();
	for (i = 0; i < filterTable.length; i++) {
		console.log(filterTable[i])
	}
}


module.exports = {
	createTable,
	addColumn,
	insertCloneTemplateData,
	printDataByID,
	printDataByColumn,
	printAllData
};
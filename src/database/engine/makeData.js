//
//
//
const {db} = require('../schema/database.js');
const {checkID} = require("../index");


//======================================================================================================================
async function createTable(newTableName = 'cloneTemplate') {
	return new Promise((resolve, reject) => {
		let sql = `CREATE TABLE ${newTableName}(id INTEGER PRIMARY KEY);`
		db.run(sql, (err, result) => {
			if (err) reject(err);
			resolve(result)
		})
	})
}

//======================================================================================================================
//Variadic column generation
async function addColumn(tableName, ...columns) {
	return new Promise((resolve, reject) => {
		if (columns.length <= 0) {
			reject()
		}
		if (columns.length >= 1) {
			columns.forEach(ele => {
				let columnArity = [];
				columnArity.unshift(`${ele} TEXT`)
				let restString = columnArity.join(',')
				let sql = `ALTER TABLE ${tableName} ADD ${restString};`
				db.run(sql, (err) => {
					if (err) reject();
				})
			})
		} resolve(true)
	})
}

//======================================================================================================================
//Insert data into specified table
// async function insertCloneTemplateData(actionNickname, username, templateRepo, tableName = 'cloneTemplate') {
// 	let sql = `INSERT INTO ${tableName}(actionNickname, username, templateRepo) VALUES (?, ?, ?);`;
// 	await db.run(sql, [actionNickname, username, templateRepo], err => {
// 		if (err) return console.error(err.message);
// 		else return console.log(`${actionNickname} stored in ${tableName}`);
// 	});
// }

//======================================================================================================================
function getDataByColumn(value, columnName, tableName) {
	return new Promise((resolve, reject)=>{
		let sql = `SELECT * FROM ${tableName} WHERE ${columnName} = '${value}';`
		db.serialize(()=>{
			db.get(sql, (err, rows)=>{
				if (err) reject(err)
				resolve(rows)
			})
		});
	})
}

async function returnByColumn(value, columnName = 'actionNickname', tableName = 'cloneTemplate') {
	return await getDataByColumn(value, columnName, tableName).then(results => {
		console.log(results)
		return results
	});
}

async function getDataByID(value, tableName) {
	if (await checkID(value) === true) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT * FROM ${tableName} WHERE id = '${value}';`
			db.serialize(() => {
				db.get(sql, (err, rows) => {
					if (err) reject(err)
					resolve(rows)
				})
			});
		})
	} else return false
}

async function returnByID(value, tableName = 'cloneTemplate') {
	return await getDataByID(value, tableName).then(results => {
		console.log(results)
		return results
	});
}

//======================================================================================================================
//Return all table data as obj array
function getAllFromTable(tableName) {
	try {
		return new Promise((resolve, reject) => {
			let sql = `SELECT * FROM ${tableName};`
			db.all(sql, (err, rows) => {
				if (err) reject(err)
				resolve(rows)
			})
		})
	} catch (err) {console.log(typeof err)}
}

async function getAll(tableName = 'cloneTemplate') {
	return await getAllFromTable(tableName).then(results => {
		return results
	});
}

async function printAllData(tableName = 'cloneTemplate', printString = true) {
	let tableData = await getAllFromTable(tableName).then(results => {return results})
	if (printString === true) {
		for (let i = 0; i < tableData.length; i++) {
			console.log(JSON.stringify(tableData[i]))
		}
	} else {
		for (let i = 0; i < tableData.length; i++) {
			console.log(tableData[i])
		}
	}
}


module.exports = {
	createTable,
	addColumn,
	// insertCloneTemplateData,
	returnByColumn,
	returnByID,
	getAll,
	printAllData
};
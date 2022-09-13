//
//
//
const {db} = require('../schema/database.js');
const {checkID} = require("./checkData.js");
// const {listAllTables, checkTableExists, countTableRows} = require("../index");
const prompt = require('prompt-sync')({sigint: true});


async function createTable(newTableName) {
	return new Promise((resolve, reject) => {
		let sql = `CREATE TABLE ${newTableName}(id INTEGER PRIMARY KEY);`
		db.run(sql, (err, result) => {
			if (err) reject(err);
			resolve(result)
		})
	})
}

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

// "printString" toggles obj array or string output
async function printAllData(tableName, printString = true) {
	let tableData = await getAllFromTable(tableName).then(results => {return results})
	if (printString === true) {
		for (let i = 0; i < tableData.length; i++) {
			console.log(' ', JSON.stringify(tableData[i]))
		}
	} else {
		for (let i = 0; i < tableData.length; i++) {
			console.log(' ', tableData[i])
		}
	}
}


module.exports = {
	createTable,
	getDataByColumn,
	getDataByID,
	getAllFromTable,
	printAllData,
};
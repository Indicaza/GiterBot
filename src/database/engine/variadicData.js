//
//
//
const {getDataByID} = require("./makeData.js")
const {countTableRows} = require("./checkData.js");
const {db} = require("../schema/database.js");
const prompt = require('prompt-sync')({sigint: true});


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

//Returns array of column names if at least 1 row exists, else returns false
//Works with cloneTemplate but not any other table.
async function returnColumnData(tableName = 'cloneTemplate') {
    if (await countTableRows(tableName) > 0) {
        return await new Promise((resolve) => {
            getDataByID(1, tableName).then(results => {
                let columnData = []
                for (const [key] of Object.entries(results)) {
                    columnData.push(`${key}`)
                }
                resolve(columnData)
            })
        })
    } else return false
}

//Outputs array of row data
async function variadicArray(columnNumber) {
    return await new Promise((resolve) => {
        let arity = []
        for (let i = 0; i < columnNumber.length; i++) {
            let tableName = prompt(`  (GB)  ${columnNumber[i]}: `)
            arity.push(tableName)
        }
        console.clear()
        resolve(arity)
    })
}

//Inserts user defined data into specified table.
async function insertNewRow(variadicColumns, variadicValues, tableName = 'cloneTemplate') {
    let sql = `INSERT INTO ${tableName} (${variadicColumns}) VALUES (${variadicValues});`
    await db.run(sql, (err, result) => {
        if (err) return console.error(err.message);
        return result
    });
}


module.exports = {
    addColumn,
    returnColumnData,
    variadicArray,
    insertNewRow,
};
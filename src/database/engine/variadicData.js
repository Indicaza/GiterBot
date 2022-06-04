//
//
//
const {getDataByID} = require("./makeData.js")
const {checkID, countTableRows} = require("../index.js");
const {db} = require("../schema/database.js");


//======================================================================================================================
//Returns array of column names if at least 1 row exists, else returns false
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

//======================================================================================================================
//Argument = # of columns
//OUTPUTS ARRAY OF NEW TABLE DATA
async function variadicArray(columnNumber) {
    return await new Promise((resolve) => {
        let arity = []
        for (let i = 0; i < columnNumber.length; i++) {
            let tableName = prompt(`  (GB)  ${columnNumber[i]}: `)
            arity.push(tableName)
        }
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

module.exports = {returnColumnData, variadicArray, insertNewRow}
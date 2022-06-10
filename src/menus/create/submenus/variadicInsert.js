//
//
//
const {
    listAllTables,
    checkTableExists,
    returnColumnData,
    countTableRows,
    deleteRowByID,
    variadicArray,
    insertNewRow,
    printAllData,
} = require("../../../database");
const {db} = require("../../../database/schema/database");
const {convertString} = require("../../../scripts/functions");
const prompt = require('prompt-sync')({sigint: true});


async function variadicInsert() {
    let placeholder = 0;
    console.clear()
    console.log(`\n`)
    for (; ;) {

        let tables = await listAllTables()
        let tableSlice = tables.slice(0, tables.length - 2)
        let tableNames = []
        tableSlice.forEach((tableName) => {
            tableNames.push(tableName.name)
        })
        console.log('====================================================================================================================')
        console.log(tableNames)
        console.log('====================================================================================================================')
        let tableName = prompt(`  (GB)  Enter Table Name: `)

        if (await checkTableExists(tableName) === true && await countTableRows(tableName) >= 1) {
            let columnCheck = await returnColumnData(tableName)
            console.clear()
            console.log(`\n`)
            console.log('====================================================================================================================')
            console.log(columnCheck)
            console.log('====================================================================================================================')
            await columnCheck.shift()

            if (placeholder === 1) {
                await deleteRowByID(1, tableName)
            }

            let variadicColumns = JSON.stringify(columnCheck).slice(1, -1)
            let functionArrayValues = await variadicArray(columnCheck)
            let variadicValues = JSON.stringify(functionArrayValues).slice(1, -1)

            console.log('\n')
            console.log('====================================================================================================================')
            for (let i = 0; i < columnCheck.length; i++) {
                console.log(`  ${columnCheck[i]}: ${functionArrayValues[i]},`)
            }
            console.log('====================================================================================================================')
            let confirm = prompt(`  (GB)  Insert Row Into ${tableName}? (y, n) `)

            if (convertString(confirm) === true) {
                await insertNewRow(variadicColumns, variadicValues, tableName)
                console.clear()
                break;
            }

            console.clear()
            console.log(`%c
   ___ ____   ____  ___  ______  ____    ___  ___  ____ __  __ __ __
  //   || \\\\ ||    // \\\\ | || | ||       ||\\\\//|| ||    ||\\ || || ||
 ((    ||_// ||==  ||=||   ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  \\\\__ || \\\\ ||___ || ||   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
                console.log('====================================================================================================================')
                let exitCheck = prompt(`  (GB)  RETURN TO (CREATE MENU)? (y, n) `);

                if (convertString(exitCheck) === true) {
                    console.clear()
                    break;
                } else {
                    console.clear()
                    console.log(`\n`)
                }

                } else if (await countTableRows(tableName) === 0) {
                    await db.run(`INSERT INTO ${tableName}(id) VALUES (1)`)
                    placeholder = 1
                } else {
                console.clear()
                console.log(`\n`)
                console.log(`  Table: "${tableName}" does not exist.`)
            }
        }
    }


module.exports = {variadicInsert};
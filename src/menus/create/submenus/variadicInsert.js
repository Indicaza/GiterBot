//
//
//
const {
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

    for (; ;) {
        let tableName = prompt(`  (GB)  Enter Table Name: `)

        if (await checkTableExists(tableName) === true && await countTableRows(tableName) >= 1) {
            let columnCheck = await returnColumnData(tableName)
            console.log(columnCheck)
            await columnCheck.shift()
            if (placeholder === 1) {
                await deleteRowByID(1, tableName)
            }
            let variadicColumns = JSON.stringify(columnCheck).slice(1, -1)
            let functionArrayValues = await variadicArray(columnCheck)
            let variadicValues = JSON.stringify(functionArrayValues).slice(1, -1)

            console.log('\n')
            console.log('====================================================================================================================')
            await console.log(`  ${columnCheck[0]}: ${functionArrayValues[0]}`)
            await console.log(`  ${columnCheck[1]}: ${functionArrayValues[1]}`)
            await console.log(`  ${columnCheck[2]}: ${functionArrayValues[2]}`)
            await console.log(`  ${columnCheck[3]}: ${functionArrayValues[3]}`)
            console.log('====================================================================================================================')
            console.log('\n')
            let confirm = prompt(`  (GB)  Insert into ${tableName} (y, n) `)

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
            console.log(`\n`)
            let exitCheck = prompt(`  (GB)  RETURN TO (CREATE MENU)? (y, n) `);

            if (convertString(exitCheck) === true) {
                console.clear()
                break;
            } else {
                console.clear()
            }

            } else if (await countTableRows(tableName) === 0) {
                await db.run(`INSERT INTO ${tableName}(id) VALUES (1)`)
                placeholder = 1
            } else console.log(`  Table: "${tableName}" does not exist.`)
        }
    }



(async () => {
    await variadicInsert();
})();

// module.exports = {variadicInsert};
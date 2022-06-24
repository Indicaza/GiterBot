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
} = require("../../../database");
const {db} = require("../../../database/schema/database");
const {print} = require("../../print/printMenu");
const {getAllFromTable} = require("../../../database/engine/makeData");
const prompt = require('prompt-sync')({sigint: true});


async function createRow() {

    let tableData;
    let home;
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

        if (tableData === 1) {
            await print()
            console.log(`\n`)
        }

        console.log('====================================================================================================================')
        console.log(`   Enter a Table: to manipulate.`)
        console.log('  ', tableNames)
        console.log('====================================================================================================================')
        console.log(`   *print*  *back*  *exit*   `)
        console.log(`-----------------------------`)
        tableData = 0;
        home = 0;
        let tableName = prompt(`   (GB) (table) = `);
        let userInputFiltered = tableName.toLowerCase();

        switch (userInputFiltered) {
            case 'print':
                tableData = 1;
                break;
            case 'back':
                home = 1;
                break;
            case 'exit':
                console.clear()
                process.kill(process.pid, 'SIGTERM');
        }
        if (home === 1) break;

        console.clear()
        console.log(`\n`)
        if (await checkTableExists(tableName) === true) {

            let columnCheck;
            let proxyRow;
            if (await countTableRows(tableName) === 0) {
                proxyRow = await db.run(`INSERT INTO ${tableName}(id) VALUES (1)`)
                columnCheck = await returnColumnData(1,tableName)
                placeholder = 1;
            } else {
                proxyRow = await getAllFromTable(tableName)
                let proxyID = await proxyRow[0].id;
                columnCheck = await returnColumnData(proxyID, tableName)
            }


            console.log('====================================================================================================================')
            console.log(await columnCheck)
            console.log('====================================================================================================================')
            await columnCheck.shift()

            if (placeholder === 1) {
                await deleteRowByID(1, tableName)
            }

            let variadicColumns = JSON.stringify(columnCheck).slice(1, -1)
            let functionArrayValues = await variadicArray(columnCheck)
            let variadicValues = JSON.stringify(functionArrayValues).slice(1, -1)

            console.log('\n')
            console.log(`   Table: `)
            console.log('====================================================================================================================')
            for (let i = 0; i < columnCheck.length; i++) {
                console.log(`  ${columnCheck[i]}: ${functionArrayValues[i]},`)
            }
            console.log('====================================================================================================================')
            let confirm = prompt(`  (GB)  Insert Row Into ${tableName}? (y, n) `)

            if (confirm === 'y') {
                await insertNewRow(variadicColumns, variadicValues, tableName)
                console.clear()
            }

            console.clear()

        } else {
            console.clear()
            console.log(`\n`)
            console.log(`  Table: "${tableName}" does not exist.`)
        }
    }
}


module.exports = {createRow};




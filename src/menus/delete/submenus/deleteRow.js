//
//
//
const {listAllTables, checkTableExists, countTableRows, printAllData, checkColumn, deleteRowByID} = require('../../../database');
const {print} = require("../../print/printMenu.js");
const prompt = require('prompt-sync')({sigint: true});


async function deleteRow() {

    let tableData;
    let home;
    let tables = await listAllTables()
    let tableSlice = tables.slice(0, tables.length - 2)
    let tableNames = []
    tableSlice.forEach((tableName) => {
        tableNames.push(tableName.name)
    })

    console.clear()
    console.log(`\n`)
    for (; ;) {

        if (tableData === 1) {
            await print()
            console.log(`\n`)
        }


        console.log('====================================================================================================================')
        console.log(`   Enter a Table: to Delete Row Contents.`)
        console.log('  ', tableNames)
        console.log('====================================================================================================================')
        console.log(`   *print*  *back*  *exit*   `)
        console.log(`-----------------------------`)
        tableData = 0;
        home = 0;
        let tableInput = prompt(`   (GB) (table name) = `);
        let userInputFiltered = tableInput.toLowerCase();

        switch (userInputFiltered) {
            case 'print':
                tableData = 1;
                break;
            case 'back':
                console.clear()
                console.log(`\n`)
                home = 1;
                break;
            case 'exit':
                console.clear()
                process.kill(process.pid, 'SIGTERM');
        }
        if (home === 1) break;

        if (await checkTableExists(tableInput) === true && await countTableRows(tableInput) >= 1) {

            console.clear()
            console.log(`\n`)
            for (;;) {

                if (tableData === 1) {
                    await print()
                    console.log(`\n`)
                }
                console.log(`   Table: "${tableInput}"`)
                console.log('====================================================================================================================')
                await printAllData(tableInput)
                console.log('====================================================================================================================')
                console.log(`   *print*  *back*  *exit*   `)
                console.log(`-----------------------------`)
                tableData = 0;
                home = 0;
                let idInput = prompt(`   (GB) (id) = `);
                let userInputFiltered = idInput.toLowerCase();

                switch (userInputFiltered) {
                    case 'print':
                        tableData = 1;
                        break;
                    case 'back':
                        console.clear()
                        console.log(`\n`)
                        home = 1;
                        break;
                    case 'exit':
                        console.clear()
                        process.kill(process.pid, 'SIGTERM');
                }
                if (home === 1) break;

                if (await checkColumn(parseInt(idInput), "id", tableInput) === true) {
                    console.clear()
                    console.log(`\n`)
                    await deleteRowByID(parseInt(idInput), tableInput)
                    break;
                } else {
                    // console.clear()
                    console.log(`\n`)
                    console.log(`   ID: "${idInput}" does not exist.`)
                }
            }

        } else if (await countTableRows(tableInput) === 0) {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableInput}" is empty.`)
        } else {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableInput}" does not exist.`)
        }
    }
}


module.exports = {deleteRow};

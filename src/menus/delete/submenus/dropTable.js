//
//
//
const {listAllTables, checkTableExists, printAllData, dropTable} = require('../../../database');
const {print} = require("../../print/printMenu.js");
const prompt = require('prompt-sync')({sigint: true});


async function deleteTable() {

    let tableData;
    let home;


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
        console.log(`   Enter a Table: to Delete`)
        console.log(' ', tableNames)
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
                home = 1;
                break;
            case 'exit':
                console.clear()
                process.kill(process.pid, 'SIGTERM');
        }
        if (home === 1) break;

        if (await checkTableExists(tableInput) === true) {

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
                console.log(`   *drop*  *print*  *back*  *exit*   `)
                console.log(`-------------------------------------`)
                tableData = 0;
                home = 0;
                let idInput = prompt(`   (GB) (type drop to delete "${tableInput}") = `);
                let userInputFiltered = idInput.toLowerCase();

                switch (userInputFiltered) {
                    case `drop`:
                        console.clear()
                        console.log(`\n`)
                        home = 1;
                        dropTable(tableInput)
                        console.log(`   Table: "${tableInput}" was deleted.`)
                        break;
                    case 'print':
                        tableData = 1;
                        break;
                    case 'back':
                        console.clear()
                        console.log(`\n`)
                        home = 1;
                        break;
                    case 'exit':
                        // console.clear()
                        process.kill(process.pid, 'SIGTERM');
                }
                if (home === 1) break;

            else {
                    console.log(`\n`)
                    console.log(`   Input: "${idInput}" is invalid.`)
                }
            }

        } else {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableInput}" does not exist.`)
        }
    }
}


module.exports = {deleteTable};

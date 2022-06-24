//
//
//
const {listAllTables, checkTableExists, columnCheck, countTableRows, printAllData, checkColumn, deleteRowByID, createTable, addColumn} = require('../../../database/')
const {print} = require("../../print/printMenu.js");
const prompt = require('prompt-sync')({sigint: true});


async function createRow() {

    let tableData;
    let home;
    let columnArray = [];

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

        console.log(`   Enter a Table: to manipulate.`)
        console.log('====================================================================================================================')
        console.log(tableNames)
        console.log('====================================================================================================================')
        console.log(`   *print*  *back*  *exit*   `)
        console.log(`-----------------------------`)
        tableData = 0;
        home = 0;
        let tableInput = prompt(`   (GB) = `);
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
            for (; ;) {

                if (tableData === 1) {
                    await print()
                    console.log(`\n`)
                }

                console.log(`   Table: "${tableInput}"?`)
                console.log('====================================================================================================================')
                console.log(columnCheck)
                console.log('====================================================================================================================')
                console.log(`   *create*  *print*  *back*  *exit*   `)
                console.log(`---------------------------------------`)
                tableData = 0;
                home = 0;
                let columnInput = prompt(`   (GB) = `);
                let userInputFiltered = columnInput.toLowerCase();

                switch (userInputFiltered) {
                    case 'print':
                        tableData = 1;
                        break;
                    case 'back':
                        columnArray.splice(0, columnArray.length);
                        console.clear()
                        console.log(`\n`)
                        home = 1;
                        break;
                    case 'exit':
                        // console.clear()
                        process.kill(process.pid, 'SIGTERM');
                }
                if (home === 1) break;

                if (columnArray.includes(`"${columnInput}"`)) {
                    console.clear()
                    console.log(`\n`)
                    console.log(`   Column: ${columnInput} already exists!`)
                } else if (columnInput !== 'print') {
                    console.clear()
                    console.log(`\n`)
                    columnArray.push(`"${columnInput}"`)
                }
            }
        } else {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableInput}" does not exist.`)
        }
    }
}


module.exports = {createRow};
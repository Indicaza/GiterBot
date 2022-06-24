//
//
//
const {checkTableExists, createTable, addColumn} = require('../../../database/')
const {print} = require("../../print/printMenu.js");
const {listAllTables} = require("../../../database");
const {db} = require("../../../database/schema/database");
const prompt = require('prompt-sync')({sigint: true});


async function insertColumn(tableName, columnArray) {
    for await (let column of columnArray) {
        let sql = `ALTER TABLE ${tableName} ADD ${column};`
        db.serialize(function() {
            db.run(sql)
        })
    }
}

async function createNewTable(tableName, columnArray) {
    let promises = [await createTable(tableName), await insertColumn(tableName, columnArray)]
    Promise.all(promises)
        .then((results) => {
            console.log(results);
        })
        .catch((err) => console.log(err))
}


async function makeTable() {

    let create;
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
        console.log(`   Enter a Table: to Create.`)
        console.log('  ', tableNames)
        console.log('====================================================================================================================')
        console.log(`   *print*  *back*  *exit*   `)
        console.log(`-----------------------------`)
        tableData = 0;
        home = 0;
        let tableInput = prompt(`   (GB) (new table) = `);
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

        if (await checkTableExists(tableInput) === false && tableInput !== 'print') {

            let columnArray = [];
            console.clear()
            console.log(`\n`)
            for (; ;) {

                if (tableData === 1) {
                    await print()
                    console.log(`\n`)
                }

                console.log(`   Table: "${tableInput}"`)
                console.log('====================================================================================================================')
                console.log('  ', columnArray)
                console.log('====================================================================================================================')
                console.log(`   *create*  *print*  *back*  *exit*   `)
                console.log(`---------------------------------------`)
                create = 0;
                tableData = 0;
                home = 0;
                let columnInput = prompt(`   (GB) (column name) = `);
                let userInputFiltered = columnInput.toLowerCase();

                switch (userInputFiltered) {
                    case `create`:
                        console.clear()
                        console.log(`\n`)
                        create = 1;
                        break;
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
                        console.clear()
                        process.kill(process.pid, 'SIGTERM');
                }
                if (home === 1) break;

                if (create === 1) {
                    console.clear()
                    console.log(`\n`)
                    home = 1;
                    await createNewTable(tableInput, columnArray)
                    break;
                }

                if (columnArray.includes(columnInput)) {
                    console.clear()
                    console.log(`\n`)
                    console.log(`   Column: ${columnInput} already exists!`)
                } else if (columnInput !== 'print') {
                    console.clear()
                    console.log(`\n`)
                    columnArray.push(columnInput)
                }
            }
        } else {
                console.clear()
                console.log(`\n`)
                console.log(`   Table: "${tableInput}" already exists.`)
            }
        }
}


module.exports = {makeTable};
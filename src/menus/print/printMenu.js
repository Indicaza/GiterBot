//
//
//
const {
    listAllTables,
    checkTableExists,
    countTableRows,
    printAllData,
} = require("../../database");
const prompt = require('prompt-sync')({sigint: true});


async function print() {
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


        console.log('====================================================================================================================')
        console.log(`   Table: to print`)
        console.log('  ', tableNames)
        console.log('====================================================================================================================')
        console.log(`   *back*  *exit*   `)
        console.log(`--------------------`)
        home = 0;
        let tableName = prompt(`   (GB) (print) = `)
        let userInputFiltered = tableName.toLowerCase();
        switch (userInputFiltered) {
            case 'back':
                console.clear()
                home = 1;
                break;
            case 'exit':
                console.clear()
                process.kill(process.pid, 'SIGTERM');
        }
        if (home === 1) break;

        if (await checkTableExists(tableName) === true && await countTableRows(tableName) >= 1) {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableName}"`)
            console.log('====================================================================================================================')
            await printAllData(tableName)
            console.log('====================================================================================================================')
            break;

        } else if (await countTableRows(tableName) === 0) {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableName}" is empty.`)
        } else {
            console.clear()
            console.log(`\n`)
            console.log(`   Table: "${tableName}" does not exist.`)
        }
    }
}


module.exports = {print};
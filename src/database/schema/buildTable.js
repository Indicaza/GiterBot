//
//
//
const {checkTableExists, createTable, addColumn} = require('../');


//Builds and initializes table
async function buildTable(tableName, ...columns) {
    if (await checkTableExists(tableName) === false) {
        await createTable(tableName)
        await addColumn(tableName, ...columns)
    } else {
        await addColumn(tableName, ...columns)
    }
}

// (async () => {
// 	await buildTable('test', 'flags', 'test1', 'test2', 'test3', 'test4', 'test5')
// })();

module.exports = {buildTable};
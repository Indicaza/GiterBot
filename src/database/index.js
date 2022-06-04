//src/database/index.js
//
//
const {
    createTable,
    addColumn,
    returnByColumn,
    returnByID,
    getAll,
    printAllData
} = require('./engine/makeData.js');

const {
    queryTableData,
    checkID,
    checkColumn,
    checkTableExists,
    countTableRows
} = require('./engine/checkData.js');

const {
    deleteRowByID,
    deleteRowByColumn,
    dropTable
} = require('./engine/deleteData.js');


module.exports = {
    //makeData
    createTable,
    addColumn,
    returnByColumn,
    returnByID,
    getAll,
    printAllData,
    //checkData
    queryTableData,
    checkID,
    checkColumn,
    checkTableExists,
    countTableRows,
    //deleteData
    deleteRowByID,
    deleteRowByColumn,
    dropTable
}
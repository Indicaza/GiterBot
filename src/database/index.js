//src/database/index.js
//
//
const {
    createTable,
    getDataByColumn,
    getDataByID,
    getAllFromTable,
    printAllData,
} = require('./engine/makeData.js');

const {
    listAllTables,
    checkID,
    checkColumn,
    checkTableExists,
    countTableRows,
} = require('./engine/checkData.js');

const {
    deleteRowByID,
    deleteRowByColumn,
    dropTable,
} = require('./engine/deleteData.js');

const {
    addColumn,
    returnColumnData,
    variadicArray,
    insertNewRow,
} = require('./engine/variadicData.js');


module.exports = {
    //makeData
    createTable,
    getDataByColumn,
    getDataByID,
    getAllFromTable,
    printAllData,
    //checkData
    listAllTables,
    checkID,
    checkColumn,
    checkTableExists,
    countTableRows,
    //deleteData
    deleteRowByID,
    deleteRowByColumn,
    dropTable,
    //variadicData
    addColumn,
    returnColumnData,
    variadicArray,
    insertNewRow,
}
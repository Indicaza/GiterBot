//src/database/index.js
//
//
const {
    createTable,
    addColumn,
    insertCloneTemplateData,
    returnByColumn,
    returnByID,
    getAll,
    printAllData
} = require('./api/makeData.js');

const {
    queryTableData,
    checkID,
    checkColumn,
    checkTableExists,
    checkTableRows
} = require('./api/checkData.js');

const {
    deleteRowByID,
    deleteRowByColumn,
    dropTable
} = require('./api/deleteData.js');


module.exports = {
    //makeData
    createTable,
    addColumn,
    insertCloneTemplateData,
    returnByColumn,
    returnByID,
    getAll,
    printAllData,
    //checkData
    queryTableData,
    checkID,
    checkColumn,
    checkTableExists,
    checkTableRows,
    //deleteData
    deleteRowByID,
    deleteRowByColumn,
    dropTable
}
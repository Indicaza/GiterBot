//src/database/index.js
//
//
const {
    createTable,
    addColumn,
    insertCloneTemplateData,
    printDataByID,
    printDataByColumn,
    printAllData
} = require('./api/makeData.js');

const {
    queryTableData,
    checkID,
    checkColumn,
    checkTableEmpty
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
    printDataByID,
    printDataByColumn,
    printAllData,
    //checkData
    queryTableData,
    checkID,
    checkColumn,
    checkTableEmpty,
    //deleteData
    deleteRowByID,
    deleteRowByColumn,
    dropTable
}
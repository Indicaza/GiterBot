//
//
//
const {
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
    countTableRows,
    //deleteData
    deleteRowByID,
    deleteRowByColumn,
    dropTable
} = require('../');


class Data{
    constructor(...rest) {
        this.id = 0;
        this.flags = 'z';
        this.username = 'username';
        this.templateRepo = 'templateRepo';
    }



}
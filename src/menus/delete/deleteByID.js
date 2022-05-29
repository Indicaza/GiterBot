//
//
//
const {
    db,
    buildCloneTemplate,
    queryTableData,
    checkColumnValue,
    checkTableEmpty,
    createTable,
    addColumn,
    insertCloneTemplateData,
    saveTemplate,
    deleteRow,
    deleteRowByID,
    deleteRowByColumn,
    dropTable,
    getData
} = require('../../server');
const {insult} = require("../../scripts/shake.js")
const prompt = require('prompt-sync')({sigint: true});

const {convertString} = require("../../scripts/functions");
// const {saveTemplate} = require("../../database");



function deleteID() {

    let tableName = prompt('  (GB)  Enter Table Name: ');
    let id = prompt('  (GB)  Enter Table ID: ');


    console.log('\n');
    // console.log(`  (GB)  Action Name = ${actionNickname}`);
    // console.log(`  (GB)  Username = ${username}`);

    let confirm = prompt(`  (GB)  Are you sure you want to delete row ${id}? (y, n) `);

    if (convertString(confirm) === true) {
        console.log('convertString() succeeded');
        db.serialize(function () {
            console.log(columnExists, typeof columnExists)
            deleteRowByID(id, tableName);
            queryTableData(tableName);
        })
    }
}

module.exports = {deleteID};
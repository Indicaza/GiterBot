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
    deleteRowByID,
    deleteRowByColumn,
    dropTable,
    getData
} = require('../../server');
const {insult} = require("../../scripts/shake.js")
const prompt = require('prompt-sync')({sigint: true});

const {convertString} = require("../../scripts/functions");
const {saveTemplate} = require("../../database");

function deleteByColumn() {

    let column = prompt('  (GB)  Action Nickname: ');
    let username = prompt('  (GB)  GitHub Username: ');
    let templateRepo = prompt('  (GB)  Name of Template Repository: ');

    console.log('\n');
    console.log(`  (GB)  Action Name = ${actionNickname}`);
    console.log(`  (GB)  Username = ${username}`);
    console.log(`  (GB)  Target Repository Name = ${templateRepo}`);

    let confirm = prompt(`  (GB)  Are you sure you want to save Template? (y, n) `);

    if (convertString(confirm) === true) {
        console.log('convertString() succeeded');
        saveTemplate(actionNickname, username, templateRepo)
    }
}
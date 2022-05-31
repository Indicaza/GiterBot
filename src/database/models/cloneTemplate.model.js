//
//TODO Make modular so users can create custom tables
//
const {checkTableRows, checkTableExists, createTable, addColumn} = require('../');
const {db} = require('./database.js');


async function buildCloneTemplate(tableName = "cloneTemplate") {
    let tableExists = await checkTableRows()
    if (await checkTableExists(tableName) === true) {
        db.serialize(function () {
            createTable()
            addColumn("cloneTemplate", "flags", "actionNickname", "username", "templateRepo")
        })
    } else {
        await addColumn("cloneTemplate", "flags", "actionNickname", "username", "templateRepo")
        console.log('built CloneTemplate')
    }
}


module.exports = {buildCloneTemplate};
//
//TODO Make modular so users can create custom tables
//
const {checkTableEmpty, createTable, addColumn} = require('../');
const {db} = require('./database.js');


async function buildCloneTemplate() {
    let tableExists = await checkTableEmpty()
    if (tableExists === true) {
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
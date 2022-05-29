//
//
//
const {db} = require('../models/database.js');


//======================================================================================================================
//Delete by id
function deleteRowByID(id, tableName = 'cloneTemplate') {
    let sql = `DELETE from ${tableName} where id = ${id};`;
    db.run(sql, err => {
        if (err) return console.error(err.message);
    });
}

//======================================================================================================================
//Delete by column
function deleteRowByColumn(columnValue, column = 'actionNickname', tableName = 'cloneTemplate') {
    let sql = `DELETE from ${tableName} where ${column} = ${columnValue};`;
    db.run(sql, err => {
        if (err) return console.error(err.message);
    });
}

//======================================================================================================================
//Drop table
function dropTable(tableName = 'cloneTemplate') {
    db.run(`DROP TABLE ${tableName};`);
}


module.exports = {deleteRowByID, deleteRowByColumn, dropTable};
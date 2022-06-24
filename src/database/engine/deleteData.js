//
//
//
const {db} = require('../schema/database.js');


//======================================================================================================================
//Delete by id
function deleteRowByID(id, tableName) {
    let sql = `DELETE from ${tableName} where id = ${id};`;
    db.run(sql, err => {
        if (err) return console.error(err.message);
        console.log(`\n DELETED ID: ${id}`);
        console.log('======================================================================================================================')
    });
}

//======================================================================================================================
//Delete by column
function deleteRowByColumn(columnValue, column, tableName) {
    let sql = `DELETE from ${tableName} where ${column} = ${columnValue};`;
    db.run(sql, err => {
        if (err) return console.error(err.message);
        console.log(`\n DELETED ACTION: ${columnValue}`);
        console.log('======================================================================================================================')
    });
}

//======================================================================================================================
//Drop table
function dropTable(tableName) {
    db.run(`DROP TABLE ${tableName};`);
}


module.exports = {
    deleteRowByID,
    deleteRowByColumn,
    dropTable,
};
//
//
//
const {checkTableExists, countTableRows, deleteRowByID} = require("../../../database");
const {db} = require("../../../database/schema/database");


async function variadicInsert() {

    let placeholder = 0;

    for (;;) {
        let tableName = prompt(`  (GB)  Enter Table Name: `)

        if (await checkTableExists(tableName) === true && await countTableRows(tableName) >= 1) {
            let columnCheck = await returnColumnData(tableName) //TODO <=== MAKE WORKABLE ID = 0 (only works with 1)
            console.log(columnCheck, '<==(columnCheck)')
            await columnCheck.shift()
            //delete inserted row

            if (placeholder === 1) {
                await deleteRowByID(1, tableName)
                console.log('placeholder condition succeeded')
            }

            let variadicColumns = JSON.stringify(columnCheck).slice(1, -1)
            let functionArrayValues = await variadicArray(columnCheck)
            let variadicValues = JSON.stringify(functionArrayValues).slice(1, -1)
            await insertNewRow(variadicColumns, variadicValues, tableName)

            break

        } else if (await countTableRows(tableName) === 0) {
            console.log(`  Table: "${tableName}" contains no data,`)
            //ADD A BLANK ROW HERE
            await db.run(`INSERT INTO ${tableName}(id) VALUES (1);`)
            placeholder = 1
        } else console.log(`  Table: "${tableName}" does not exist.`)
    }
}


module.exports = {variadicInsert};
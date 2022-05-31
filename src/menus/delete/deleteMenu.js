//
//
//
const {printAllData} = require('../../database');
const prompt = require('prompt-sync')({sigint: true});
const {deleteID} = require('./deleteByID.js')
const {deleteColumn} = require('./deleteByColumn.js')


async function deleteMenu() {
    let tableData;
    let home;
    for (; ;) {
        console.clear()
        if (tableData === 1) {
            console.log(`\n`)
            await printAllData()
        }
console.log(`%c
  ____    ____ __     ____ ______  ____    ___  ___  ____ __  __ __ __
  || \\\\  ||    ||    ||    | || | ||       ||\\\\//|| ||    ||\\ || || ||
  ||  )) ||==  ||    ||==    ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  ||_//  ||___ ||__| ||___   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
        console.log(` ----------------------------------------------------------------------`)
        console.log('======= delete by column or id =======================================================================================')
        console.log(` ------------------------------------`)
        console.log('   * column')
        console.log('   * id')
        console.log('   * print')
        console.log('   * home')
        console.log('   * exit')
        console.log(`  ----------------`)
        tableData = 0;
        home = 0;
        let userInput = prompt(`   (GB) = `);
        let userInputFiltered = userInput.toLowerCase();

        switch (userInputFiltered) {
            case 'column':
                await deleteColumn();
                break;
            case 'id':
                await deleteID();
                break;
            case 'print':
                tableData = 1;
                break;
            case 'home':
                home = 1;
                break;
            case 'exit':
                console.clear()
                process.kill(process.pid, 'SIGTERM');
        }
        if (home === 1) break;
    }
}


module.exports = {deleteMenu}
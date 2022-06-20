//
//
//
const {print} = require('../print/printMenu.js');
const {deleteRow} = require('./submenus/deleteRow.js');
const prompt = require('prompt-sync')({sigint: true});


async function deleteMenu() {
    let tableData;
    let home;
    for (; ;) {
        console.clear()
        if (tableData === 1) {
            // console.log(`\n`)
            await print()
        }
console.log(`%c
  ____    ____ __     ____ ______  ____    ___  ___  ____ __  __ __ __
  || \\\\  ||    ||    ||    | || | ||       ||\\\\//|| ||    ||\\ || || ||
  ||  )) ||==  ||    ||==    ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  ||_//  ||___ ||__| ||___   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
        console.log('====================================================================================================================')
        console.log(`   *row*  *table*  *print*  *back*  *exit*   `)
        console.log(`---------------------------------------------`)
        tableData = 0;
        home = 0;
        let userInput = prompt(`   (GB) = `);
        let userInputFiltered = userInput.toLowerCase();

        switch (userInputFiltered) {
            case 'row':
                await deleteRow();
                break;
            case 'table':
                //TODO Create a dropTable() UI
                break;
            case 'print':
                tableData = 1;
                break;
            case 'back':
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
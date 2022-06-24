//
//
//
const {print} = require('../print/printMenu.js');
const {createRow} = require('./submenus/createRow.js');
const {makeTable} = require('./submenus/createTable.js');
const prompt = require('prompt-sync')({sigint: true});


async function createMenu() {
    let tableData;
    let home;
    for (; ;) {
        console.clear()
        if (tableData === 1) {
            console.log(`\n`)
            await print()
        }
        console.log(`%c
   ___ ____   ____  ___  ______  ____    ___  ___  ____ __  __ __ __
  //   || \\\\ ||    // \\\\ | || | ||       ||\\\\//|| ||    ||\\ || || ||
 ((    ||_// ||==  ||=||   ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  \\\\__ || \\\\ ||___ || ||   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
        console.log('====================================================================================================================')
        console.log('   *row*  *table*  *print*  *back*  *exit*   ')
        console.log(`---------------------------------------------`)
        tableData = 0;
        home = 0;
        let userInput = prompt(`   (GB) = `);
        let userInputFiltered = userInput.toLowerCase();

        switch (userInputFiltered) {
            case 'row':
                await createRow();
                break;
            case 'table':
                await makeTable();
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


module.exports = {createMenu};

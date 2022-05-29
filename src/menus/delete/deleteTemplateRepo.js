//
//
//
const {printAllData} = require('../../database');
const {insult} = require("../../scripts/shake.js")
const prompt = require('prompt-sync')({sigint: true});
const {deleteID} = require('./deleteByID.js')


async function deleteTemplateRepo() {
    let tableData;
    let home;
    for (; ;) {
        console.clear()
        console.log(`\n`)
        if (tableData === 1) {
            await printAllData()
        }
        console.log(`%c
____    ____ __     ____ ______  ____    ___  ___  ____ __  __ __ __  ____
|| \\\\  ||    ||    ||    | || | ||       ||\\\\//|| ||    ||\\ || || || ||   
||  )) ||==  ||    ||==    ||   ||==     || \\/ || ||==  ||\\\\|| || || ||== 
||_//  ||___ ||__| ||___   ||   ||___    ||    || ||___ || \\|| \\\\_// ||___`, `font-family: monospace`);
        console.log('  -delete by column or id-')
        console.log('    * column\n    * id\n    * print\n    * home\n    * exit\n');
        tableData = 0;
        home = 0;
        let userInput = prompt(`  (GB) = `);
        let userInputFiltered = userInput.toLowerCase();

        switch (userInputFiltered) {
            case 'column':
                break;
            case 'id':
                deleteID();
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


module.exports = {deleteTemplateRepo}
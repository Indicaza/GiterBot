//
//
//
const {returnByColumn, printAllData, deleteRowByColumn} = require('../../../database');
const {convertString} = require("../../../scripts/functions");
const prompt = require('prompt-sync')({sigint: true});


async function deleteColumn() {

    for (;;) {
        console.clear()
        console.log(`%c
 ____    ____ __     ____ ______  ____    ____  _  _      ___   ___   __    __ __ ___  ___ __  __
 || \\\\  ||    ||    ||    | || | ||       || )) \\\\//     //    // \\\\  ||    || || ||\\\\//|| ||\\ ||
 ||  )) ||==  ||    ||==    ||   ||==     ||=)   )/     ((    ((   )) ||    || || || \\/ || ||\\\\||
 ||_//  ||___ ||__| ||___   ||   ||___    ||_)) //       \\\\__  \\\\_//  ||__| \\\\_// ||    || || \\||`, `font-family: monospace`);
        console.log('====================================================================================================================')
        await printAllData();
        console.log('====================================================================================================================')
        console.log(`\n`)
        let columnValue = prompt('  (GB)  Enter Action: ');

        console.clear()
        console.log(`%c
 ____    ____ __     ____ ______  ____ 
 || \\\\  ||    ||    ||    | || | ||    
 ||  )) ||==  ||    ||==    ||   ||==  
 ||_//  ||___ ||__| ||___   ||   ||___ `, `font-family: monospace`);
        console.log('====================================================================================================================')
        await returnByColumn(columnValue);
        console.log('====================================================================================================================')
        console.log(`\n`)
        let confirm = prompt(`  (GB)  DELETE ACTION: ${columnValue}? (y, n) `);

        if (convertString(confirm) === true) {
            console.clear()
            deleteRowByColumn(`"${columnValue}"`);
            break;
        }

        console.clear()
        console.log(`%c
 ____    ____ __     ____ ______  ____    ___  ___  ____ __  __ __ __  ____
 || \\\\  ||    ||    ||    | || | ||       ||\\\\//|| ||    ||\\ || || || ||   
 ||  )) ||==  ||    ||==    ||   ||==     || \\/ || ||==  ||\\\\|| || || ||== 
 ||_//  ||___ ||__| ||___   ||   ||___    ||    || ||___ || \\|| \\\\_// ||___`, `font-family: monospace`);
        console.log('====================================================================================================================')
        console.log(`\n`)
        let exitCheck = prompt(`  (GB)  RETURN TO (DELETE MENU)? (y, n) `);

        if (convertString(exitCheck) === true) {
            console.clear()
            break;
        } else {
            console.clear()
        }
    }
}


module.exports = {deleteColumn};


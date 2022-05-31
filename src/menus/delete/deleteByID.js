//
//
//
const {formatByID, printAllData, deleteRowByID} = require('../../database');
const {convertString} = require("../../scripts/functions");
const prompt = require('prompt-sync')({sigint: true});


async function deleteID() {
    for (;;) {
        console.clear()
        console.log(`%c
 ____    ____ __     ____ ______  ____    ____  _  _    __ ____  
 || \\\\  ||    ||    ||    | || | ||       || )) \\\\//    || || \\\\ 
 ||  )) ||==  ||    ||==    ||   ||==     ||=)   )/     || ||  ))
 ||_//  ||___ ||__| ||___   ||   ||___    ||_)) //      || ||_//`, `font-family: monospace`);
        await printAllData();
        console.log(`\n`)
        let id = prompt('  (GB)  Enter ID: ');

        console.clear()
        console.log(`%c
 ____    ____ __     ____ ______  ____ 
 || \\\\  ||    ||    ||    | || | ||    
 ||  )) ||==  ||    ||==    ||   ||==  
 ||_//  ||___ ||__| ||___   ||   ||___ `, `font-family: monospace`);
        await formatByID(id);
        console.log(`\n`)
        let confirm = prompt(`  (GB)  DELETE ID: ${id}? (y, n) `);

        if (convertString(confirm) === true) {
            console.clear()
            console.log('\n')
            deleteRowByID(id)
            await printAllData()
            break;
        }

        console.clear()
        console.log(`%c
 ____    ____ __     ____ ______  ____    ___  ___  ____ __  __ __ __  ____
 || \\\\  ||    ||    ||    | || | ||       ||\\\\//|| ||    ||\\ || || || ||   
 ||  )) ||==  ||    ||==    ||   ||==     || \\/ || ||==  ||\\\\|| || || ||== 
 ||_//  ||___ ||__| ||___   ||   ||___    ||    || ||___ || \\|| \\\\_// ||___`, `font-family: monospace`);
        console.log('======================================================================================================================')
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

module.exports = {deleteID};
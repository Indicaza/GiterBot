//
//
//
const {printAllData} = require('../../database');
const prompt = require('prompt-sync')({sigint: true});


async function createMenu() {
    let tableData;
    let home;
    for (; ;) {
        console.clear()
        if (tableData === 1) {
            console.log(`\n`)
            await printAllData()
        }
        console.log(`%c
   ___ ____   ____  ___  ______  ____    ___  ___  ____ __  __ __ __
  //   || \\\\ ||    // \\\\ | || | ||       ||\\\\//|| ||    ||\\ || || ||
 ((    ||_// ||==  ||=||   ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  \\\\__ || \\\\ ||___ || ||   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
        console.log(` --------------------------------------------------------------------`)
        console.log('======= delete by column or id =======================================================================================') //118
        console.log(` ----------------------------------`)
        console.log('   * quickAction')
        console.log('   * cloneTemplate')
        console.log('   * print')
        console.log('   * home')
        console.log('   * exit')
        console.log(`  ---------------`)
        tableData = 0;
        home = 0;
        let userInput = prompt(`   (GB) = `);
        let userInputFiltered = userInput.toLowerCase();

        switch (userInputFiltered) {
            case 'quickAction':
                break;
            case 'id':

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

createMenu();

module.exports = {createMenu};

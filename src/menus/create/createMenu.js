//
//
//
const {printAllData} = require('../../database');
const {configTemplate} = require('./submenus/configTemplate.js')
const prompt = require('prompt-sync')({sigint: true});


async function createMenu() {
    let tableData;
    let home;
    for (; ;) {
        console.clear()
        if (tableData === 1) {
            console.log(`\n`)
            console.log('====================================================================================================================')
            await printAllData()
            console.log('====================================================================================================================')
        }
        console.log(`%c
   ___ ____   ____  ___  ______  ____    ___  ___  ____ __  __ __ __
  //   || \\\\ ||    // \\\\ | || | ||       ||\\\\//|| ||    ||\\ || || ||
 ((    ||_// ||==  ||=||   ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  \\\\__ || \\\\ ||___ || ||   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
        console.log(` --------------------------------------------------------------------`)
        console.log('======== create git configs ========================================================================================') //118
        console.log(` ----------------------------------`)
        console.log('   * insert')
        console.log('   * newTable')
        console.log('   * print')
        console.log('   * home')
        console.log('   * exit')
        console.log(`  ---------------`)
        tableData = 0;
        home = 0;
        let userInput = prompt(`   (GB) = `);
        let userInputFiltered = userInput.toLowerCase();

        switch (userInputFiltered) {
            case 'config':
                await configTemplate();
                break;
            case 'flags':
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


module.exports = {createMenu};

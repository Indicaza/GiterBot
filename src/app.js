#!/usr/bin/env node
/**
 * GiterBot
 * A CLI that allows users to save terminal commands and assigns them to custom hotkeys.
 *
 * @author Indicaza <n/a>
 */
//TODO UPDATE IMPORTS/EXPORTS FOR CROSS COMPATIBILITY

const {buildTable} = require('./database/schema/buildTable.js');
const {printAllData} = require('./database');
const {createMenu, deleteMenu} = require('./menus');
const prompt = require('prompt-sync')({sigint: true});


(async () => {
	console.clear();
	await buildTable("cloneTemplate", "flags", "actionNickname", "username", "templateRepo")

		console.log(`%c
	 ██████╗ ██╗████████╗███████╗██████╗ ██████╗  ██████╗ ████████╗
	██╔════╝ ██║╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝
	██║  ███╗██║   ██║   █████╗  ██████╔╝██████╔╝██║   ██║   ██║   
	██║   ██║██║   ██║   ██╔══╝  ██╔══██╗██╔══██╗██║   ██║   ██║   
	╚██████╔╝██║   ██║   ███████╗██║  ██║██████╔╝╚██████╔╝   ██║   
	 ╚═════╝ ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   
	 
	   --- A GitHub CLI that Works as Hard as this Slogan. ---`, `font-family: monospace`);
	let tableData;
	for (i = 0; ;i++) {
		if (i >= 1) {
			console.clear()
		}
		if (tableData === 1) {
			console.log(`\n`)
			console.log('====================================================================================================================')
			await printAllData()
			console.log('====================================================================================================================')
		}
console.log(`%c
  ___  ___  ___  __ __  __    ___  ___  ____ __  __ __ __
  ||\\\\//|| // \\\\ || ||\\ ||    ||\\\\//|| ||    ||\\ || || ||
  || \\/ || ||=|| || ||\\\\||    || \\/ || ||==  ||\\\\|| || ||
  ||    || || || || || \\||    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
		console.log(` ---------------------------------------------------------`)
		console.log('====================================================================================================================')
		console.log(` ------------------------------`)
		console.log('   * create')
		console.log('   * delete')
		console.log('   * print')
		console.log('   * exit')
		console.log(`  -------------`)
		tableData = 0;
		let userInput = prompt(`   (GB) = `);
		let userInputFiltered = userInput.toLowerCase();

		switch (userInputFiltered) {
			case 'create':
				await createMenu();
				break;
			case 'delete':
				await deleteMenu();
				break;
			case 'print':
				tableData = 1;
				break;
			case 'exit':
				console.clear()
				process.kill(process.pid, 'SIGTERM');
		}
	}
})();
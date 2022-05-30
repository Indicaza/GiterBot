#!/usr/bin/env node
/**
 * GiterBot
 * A CLI that allows users to save terminal commands and assigns them to custom hotkeys.
 *
 * @author Indicaza <n/a>
 */
//TODO UPDATE IMPORTS/EXPORTS FOR CROSS COMPATIBILITY


const {buildCloneTemplate} = require('./database/models/cloneTemplate.model.js')
const {printAllData} = require('./database');
const prompt = require('prompt-sync')({sigint: true});
const {configTemplateRepo} = require('./menus/create/configTemplateRepo.js');
const {deleteTemplateRepo} = require('./menus/delete/deleteTemplateRepo.js');


(async () => {
	await buildCloneTemplate();
	console.clear();
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
			await printAllData()
		}
console.log(`%c
  ___  ___  ___  __ __  __    ___  ___  ____ __  __ __ __
  ||\\\\//|| // \\\\ || ||\\ ||    ||\\\\//|| ||    ||\\ || || ||
  || \\/ || ||=|| || ||\\\\||    || \\/ || ||==  ||\\\\|| || ||
  ||    || || || || || \\||    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
		console.log(` ---------------------------------------------------------`)
		console.log('======================================================================================================================')
		console.log(` ------------------------------`)
		// console.log(`   -${shake()}-`)
		console.log('   * create')
		console.log('   * print')
		console.log('   * delete')
		console.log('   * exit')
		console.log(`  -------------`)
		// console.log('\n')
		tableData = 0;
		let userInput = prompt(`   (GB) = `);
		let userInputFiltered = userInput.toLowerCase();

		switch (userInputFiltered) {
			case 'create':
				await configTemplateRepo();
				break;
			case 'print':
				tableData = 1;
				break;
			case 'delete':
				await deleteTemplateRepo();
				break;
			case 'exit':
				console.clear()
				process.kill(process.pid, 'SIGTERM');
		}
	}
})();
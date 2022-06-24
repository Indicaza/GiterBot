#!/usr/bin/env node
/**
 * GiterBot
 * A CLI that allows users to save terminal commands and assigns them to custom hotkeys.
 *
 * @author Indicaza <n/a>
 */
const {print} = require('./menus/print/printMenu.js');
const {createMenu, deleteMenu} = require('./menus');
const prompt = require('prompt-sync')({sigint: true});


(async () => {
	console.clear()
	console.clear()
		console.log(`%c
	 ██████╗ ██╗████████╗███████╗██████╗ ██████╗  ██████╗ ████████╗
	██╔════╝ ██║╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝
	██║  ███╗██║   ██║   █████╗  ██████╔╝██████╔╝██║   ██║   ██║   
	██║   ██║██║   ██║   ██╔══╝  ██╔══██╗██╔══██╗██║   ██║   ██║   
	╚██████╔╝██║   ██║   ███████╗██║  ██║██████╔╝╚██████╔╝   ██║   
	 ╚═════╝ ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   
	 
	   --- A GitHub CLI that Works as Hard as this Slogan. ---`, `font-family: monospace`);
	let tableData;
	for (let i = 0; ;i++) {
		if (i >= 1) {
			console.clear()
		}
		if (tableData === 1) {
			await print()
		}
console.log(`%c
  ___  ___  ___  __ __  __    ___  ___  ____ __  __ __ __
  ||\\\\//|| // \\\\ || ||\\ ||    ||\\\\//|| ||    ||\\ || || ||
  || \\/ || ||=|| || ||\\\\||    || \\/ || ||==  ||\\\\|| || ||
  ||    || || || || || \\||    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
		console.log('====================================================================================================================')
		console.log(`   *create*  *delete*  *print*  *exit*   `)
		console.log(`-----------------------------------------`)
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
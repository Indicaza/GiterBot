#!/usr/bin/env node

/**
 * GiterBot
 * Creates a new repository from a GitHub template.  Then clones and inits the repo.
 *
 * @author Indicaza <n/a>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const prompt = require('prompt-sync')();
// const fs = require('fs');
const { exec } = require('child_process');
const {convertString, checkDuplicate} = require('./functions.js');
const {configTemplateRepo} = require('./configTemplateRepo.js');
const {createTemplateRepo} = require('./createTemplateRepo.js');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;


(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	console.log(
		`%c

	 ██████╗ ██╗████████╗███████╗██████╗ ██████╗  ██████╗ ████████╗
	██╔════╝ ██║╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝
	██║  ███╗██║   ██║   █████╗  ██████╔╝██████╔╝██║   ██║   ██║   
	██║   ██║██║   ██║   ██╔══╝  ██╔══██╗██╔══██╗██║   ██║   ██║   
	╚██████╔╝██║   ██║   ███████╗██║  ██║██████╔╝╚██████╔╝   ██║   
	 ╚═════╝ ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   
	 
	   --- A GitHub CLI that Works as Hard as this Slogan. ---  
	`,
		`font-family: monospace`
	);
	console.log(' MENU');
	console.log('  create \n  print \n  delete \n  exit\n');
	let userInput = prompt(`input = `);
	let userInputFiltered = userInput.toLowerCase();

	switch (userInputFiltered) {
		case 'create':
			console.log('true');
			configTemplateRepo();
			return;
		case 'print':
			console.log(data);
			return;
		case 'delete':
			return;
		case 'exit':
			break;
	}

	debug && log(flags);
})();

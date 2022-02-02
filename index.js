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
const figlet = require('figlet');
// const chalk = require('chalk');
// const gradient = require('gradient-string');
const chalkAnimation = require('chalk-animation');
const { exec } = require('child_process');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const convertString = word => {
	switch (word.toLowerCase().trim()) {
		case 'yes':
		case 'true':
		case '1':
		case 'y':
			return true;
		case 'no':
		case 'false':
		case '0':
		case 'n':
		case null:
			return false;
		default:
			return Boolean(word);
	}
};

// figlet.defaults({ fontPath: 'assets/fonts' });
//
// figlet.preloadFonts(['Standard', 'Ghost'], ready);

// function ready() {
// 	console.log(figlet.textSync('ASCII'));
// 	console.log(figlet.textSync('Art', 'Ghost'));
// }

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

	// async function welcome() {
	// 	const rainbowTitle = chalkAnimation.rainbow(
	// 		'Who Wants To Be A JavaScript Millionaire? \n'
	// 	);

	console.log(
		figlet.textSync('	GiterBot', {
			font: 'ANSI Shadow',
			horizontalLayout: 'default',
			verticalLayout: 'default',
			width: 600,
			whitespaceBreak: true
		})
	);

	for (;;) {
		let username = prompt('  (GB)  GitHub Username: ');
		let targetTemplateRepo = prompt(
			'  (GB)  Name of Template Repository: '
		);
		let targetOutputRepo = prompt('  (GB)  Name of New Repository: ');

		console.log('\n');
		console.log(`  (GB)  Username = ${username}`);
		console.log(`  (GB)  Target Repository Name = ${targetTemplateRepo}`);
		console.log(`  (GB)  New Repository Name = ${targetOutputRepo}`);

		let inputCheck = prompt('  (GB)  Is Provided Info Correct? (y,n): ');
		console.log('\n');

		if (convertString(inputCheck) === true) {
			exec(
				`gh repo create ${targetOutputRepo} --public --template=https://github.com/${username}/${targetTemplateRepo}`,
				(error, stdout, stderr) => {
					if (error) {
						console.log(`error: ${error.message}`);
						return;
					}
					if (stderr) {
						console.log(`stderr: ${stderr}`);
						return;
					}
					console.log(`stdout: ${stdout}`);
				}
			);
			break;
		}
	}

	debug && log(flags);
})();

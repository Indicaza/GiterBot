#!/usr/bin/env node

/**
 * GiterBot
 * Creates a new repository from a GitHub template.  Then clones and inits the repo.
 *
 * @author Indicaza <n/a>
 */

// const express = require('express');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const prompt = require('prompt-sync')();
// const fs = require('fs');
const figlet = require('figlet');
const { exec } = require('child_process');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const { request } = require('express');
const persist = require('./persist.json');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

// A user defined array of objects, for storing repo template shortcuts.

// let TemplateList = JSON.parse(data);

// Initializes the id: prop for user objects.
// let id;

// (Converts user input to bool.)  TODO I think I can do better here!
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

// Checks an array object for defined property values (used for checking duplicate entries before they're pushed.)
function checkDuplicate(objArray, value) {
	for (i = 0; i < objArray.length; i++) {
		if (Object.values(objArray[i]).indexOf(value) > -1) {
			return true;
			// console.log(`${objArray[i].id} contains ${value}`);
		} else if (Object.values(objArray[i]).indexOf(value) <= -1) {
			return false;
			// console.log(`${objArray[i].id} does not contain ${value}`);
		}
	}
}

// const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

// async function handleAnswer(isCorrect) {
// 	const spinner = createSpinner('Checking answer...').start();
// 	await sleep();
// 	if (isCorrect) {
// 		spinner.success({
// 			text: `Nice work "Dude". That's a legit answer`
// 		});
// 	} else {
// 		spinner.error({ text: `💀💀💀 Game over, you lose Guy` });
// 		process.exit(1);
// 	}
// }

// async function question1() {
// 	const answers = await inquirer.prompt({
// 		name: 'question_1',
// 		type: 'list',
// 		message: 'JavaScript was created in 10 days then released on\n',
// 		choices: ['A', 'B', 'C', 'D']
// 	});
//
// 	return handleAnswer(answers.question_1 === 'You Chose => A');
// 	return handleAnswer(answers.question_1 === 'You Chose => B');
// 	return handleAnswer(answers.question_1 === 'You Chose => C');
// 	return handleAnswer(answers.question_1 === 'You Chose => D');
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

	await question1();

	// Sets template repo info, then saves unique entries for quick future use.
	for (;;) {
		let username = prompt('  (GB)  GitHub Username: ');
		let targetTemplateRepo = prompt('  (GB)  Name of Template Repository: ');
		let targetOutputRepo = prompt('  (GB)  Name of New Repository: ');

		console.log('\n');
		console.log(`  (GB)  Username = ${username}`);
		console.log(`  (GB)  Target Repository Name = ${targetTemplateRepo}`);
		console.log(`  (GB)  New Repository Name = ${targetOutputRepo}`);

		let inputCheck = prompt('  (GB)  Is Provided Info Correct? (Y,n): ');
		console.log('\n');

		// targetOutputRepo !== TemplateList.includes(targetOutputRepo)
		if (checkDuplicate(TemplateList, targetTemplateRepo) !== true) {
			TemplateList.push({
				id: id++,
				username: username,
				templateRepo: targetTemplateRepo,
				duplicateRepo: targetOutputRepo
			});
		}

		console.log(TemplateList);

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

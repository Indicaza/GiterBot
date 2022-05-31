//
//TODO IMPROVE UI
//
const {insertCloneTemplateData, printAllData} = require('../../database')
const {convertString} = require('../../scripts/functions');
const prompt = require('prompt-sync')({sigint: true});


async function configTemplate() {

	for (;;) {
		console.clear()
		console.log(`%c
   ___   ___   __  __  ____ __   ___ 
  //    // \\\\  ||\\ || ||    ||  // \\\\
 ((    ((   )) ||\\\\|| ||==  || (( ___
  \\\\__  \\\\_//  || \\|| ||    ||  \\\\_||`, `font-family: monospace`);
		await printAllData();
		console.log(`\n`)
		let flag = prompt('  (GB)  Flag: ');
		let actionNickname = prompt('  (GB)  Action Nickname: ');
		let username = prompt('  (GB)  GitHub Username: ');
		let templateRepo = prompt('  (GB)  Name of Template Repository: ');

		console.clear()
		console.log(`%c
   ___   ___   __  __  ____ __   ___ 
  //    // \\\\  ||\\ || ||    ||  // \\\\
 ((    ((   )) ||\\\\|| ||==  || (( ___
  \\\\__  \\\\_//  || \\|| ||    ||  \\\\_||`, `font-family: monospace`);
		console.log('======================================================================================================================')
		console.log(`  (GB)  Flag = ${flag}`)
		console.log(`  (GB)  Action Name = ${actionNickname}`);
		console.log(`  (GB)  Username = ${username}`);
		console.log(`  (GB)  Target Repository Name = ${templateRepo}`);
		console.log('======================================================================================================================')
		console.log(`\n`)
		let confirm = prompt(`  (GB)  SAVE CONFIG: ${actionNickname} WITH FLAG: ${flag}? (y, n) `);

		if (convertString(confirm) === true) {
			console.log('convertString() succeeded');
			await insertCloneTemplateData(actionNickname, username, templateRepo)
			console.clear()
			break;
		}

		console.clear()
		console.log(`%c
   ___ ____   ____  ___  ______  ____    ___  ___  ____ __  __ __ __
  //   || \\\\ ||    // \\\\ | || | ||       ||\\\\//|| ||    ||\\ || || ||
 ((    ||_// ||==  ||=||   ||   ||==     || \\/ || ||==  ||\\\\|| || ||
  \\\\__ || \\\\ ||___ || ||   ||   ||___    ||    || ||___ || \\|| \\\\_//`, `font-family: monospace`);
		console.log('======================================================================================================================')
		console.log(`\n`)
		let exitCheck = prompt(`  (GB)  RETURN TO (CREATE MENU)? (y, n) `);

		if (convertString(exitCheck) === true) {
			console.clear()
			break;
		} else {
			console.clear()
		}
	}
}


module.exports = { configTemplate };
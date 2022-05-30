//
//
//
const {convertString} = require('../../scripts/functions');
const {insertCloneTemplateData} = require('../../database')
// const {db} = require("../database/models/database.js");
const prompt = require('prompt-sync')({sigint: true});


async function configTemplateRepo () {

	let actionNickname = prompt('  (GB)  Action Nickname: ');
	let username = prompt('  (GB)  GitHub Username: ');
	let templateRepo = prompt('  (GB)  Name of Template Repository: ');

	console.log('\n');
	console.log(`  (GB)  Action Name = ${actionNickname}`);
	console.log(`  (GB)  Username = ${username}`);
	console.log(`  (GB)  Target Repository Name = ${templateRepo}`);

	let confirm = prompt(`  (GB)  Are you sure you want to save Template? (y, n) `);

	if (convertString(confirm) === true) {
		console.log('convertString() succeeded');

		await insertCloneTemplateData(actionNickname, username, templateRepo) // => Promise { <pending> }
		.then(results=>{
		console.log(results)
		})
	}
}

module.exports = { configTemplateRepo };
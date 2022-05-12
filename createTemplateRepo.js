const {convertString, } = require('./functions.js');
const prompt = require('prompt-sync')();
const { exec } = require("child_process");


function createTemplateRepo(username, targetTemplateRepo) {
	let targetOutputRepo = prompt(`  (GB)  New Repository Name: `)
	let inputCheck = prompt(`  (GB)  Are you sure you want to create ${targetOutputRepo}? (Y,n): `);
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
	}
}

module.exports = { createTemplateRepo };

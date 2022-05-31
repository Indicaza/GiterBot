//
//
//
const {printDataByColumn, returnByColumn, printAllData} = require('../../database');
const {convertString} = require('../../scripts/functions.js');
const prompt = require('prompt-sync')({sigint: true});
const { execSync } = require("child_process");

(async () => {

	await printAllData();
	let action = prompt(`  (GB)  Action Nickname: `)
	let actionRow = await returnByColumn(`${action}`)
	console.log(actionRow.id)



	function buildTemplate(username, templateRepo) {
		let outputRepo = prompt(`  (GB)  New Repository Name: `)
		let inputCheck = prompt(`  (GB)  Are you sure you want to create ${outputRepo}? (Y,n): `);
		console.log('\n');
		if (convertString(inputCheck) === true) {
			execSync(
				`gh repo create ${outputRepo} --public --template=https://github.com/${username}/${templateRepo}`,
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
			)
		}
	}


})()



// module.exports = { buildTemplate };

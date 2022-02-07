const { exec } = require('child_process');
const prompt = require('prompt-sync')();

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

function createTemplateRepo(username, targetTemplateRepo, targetOutputRepo) {
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

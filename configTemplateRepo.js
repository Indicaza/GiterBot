const persist = require('./persist.json');
const {checkDuplicate, convertString} = require('./functions');
const prompt = require('prompt-sync')();
const fs = require('fs');

let data = persist;

function configTemplateRepo () {
	for (; ;) {
		let username = prompt('  (GB)  GitHub Username: ');
		let targetTemplateRepo = prompt('  (GB)  Name of Template Repository: ');
		let actionNickname = prompt('  (GB)  Action Nickname: ');

		// Old json persistence attempt
		// let newTemplateConfig = {
		// 	id: data.at(-1).id + 1,
		// 	actionNickname: actionNickname,
		// 	username: username,
		// 	templateRepoName: targetTemplateRepo
		// };

		console.log('\n');
		console.log(`  (GB)  Action Name = ${actionNickname}`);
		console.log(`  (GB)  Username = ${username}`);
		console.log(`  (GB)  Target Repository Name = ${targetTemplateRepo}`);

		let confirm = prompt(`  (GB)  Are you sure you want to save Template? (y, n) `);

		if ((convertString(confirm) === true) && (checkDuplicate(data, actionNickname) !== true)) {
			data.push(newTemplateConfig);
			// let tempData = JSON.stringify(newTemplateConfig);
			fs.writeFileSync('./persist.json', newTemplateConfig);
			console.log(data);
			break;
		} else if (checkDuplicate(data, actionNickname) === true) {
			console.log(`${actionNickname} Repository already exists!`);
		} else {
			console.log(`exit else`)
			break;
		}
	}
};

module.exports = { configTemplateRepo };
const {checkDuplicate, convertString} = require('./functions');
const {createTable, insertTableData, deleteRowData, queryTableData, saveTemplate} = require('./data.js');
const prompt = require('prompt-sync')();


function configTemplateRepo () {

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
			saveTemplate(actionNickname, username, templateRepo)
		}
}

module.exports = { configTemplateRepo };
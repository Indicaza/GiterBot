const prompt = require('prompt-sync')();
const persist = require('./persist.json');

let data = persist;

// Checks an array of objects for specific property "values", then counts repeated values (used for checking duplicate entries before they're pushed.)
function checkDuplicate(objArray, value) {
	let propCount = 0;
	for (i = 0; i < objArray.length; i++) {
		if (Object.values(objArray[i]).indexOf(value) > -1) {
			// console.log(`${objArray[i].id} contains ${value}`);
			propCount++;
		}
		if (i === objArray.length - 1 && propCount > 0) {
			console.log('Truthy Success!');
			return true;
		} else if (i === objArray.length - 1 && propCount <= 0) {
			console.log('Falsy Success!');
			return false;
		}
	}
}

//
// Sets template repo info, then saves unique entries for quick future use.
//

for (;;) {
	let username = prompt('  (GB)  GitHub Username: ');
	let targetTemplateRepo = prompt('  (GB)  Name of Template Repository: ');
	let targetOutputRepo = prompt('  (GB)  Name of New Repository: ');

	let newTemplateConfig = {
		id: data.at(-1).id + 1,
		username: username,
		templateRepoName: targetTemplateRepo,
		newRepoName: targetOutputRepo
	};

	console.log('\n');
	console.log(`  (GB)  Username = ${username}`);
	console.log(`  (GB)  Target Repository Name = ${targetTemplateRepo}`);
	console.log(`  (GB)  New Repository Name = ${targetOutputRepo}`);

	if (checkDuplicate(data, targetOutputRepo) !== true) {
		data.push(newTemplateConfig);
		console.log(data);
		break;
	} else {
		console.log(`${targetOutputRepo} Repository already exists!`);
	}
}

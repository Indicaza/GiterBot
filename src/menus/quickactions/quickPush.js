//TODO HOT GARBO - NEEDS WORK
//rm -f .git/index.lock
//
const {db} = require('../../database/models/database.js')
const { exec } = require('child_process');


async function add(gitAdd = `git add --all`) {
	await exec(`${gitAdd}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return error;
		} if (stderr) {
			console.log(`stderr: ${stderr}`);
			return stderr;
		} else {
			console.log(`Output: ${stdout}`);
			return stdout;
		}
	});
}

async function commit(gitCommit = `git commit -m `, comment = `"GB"`) {
	await exec(`${gitCommit} ${comment}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return error;
		} if (stderr) {
			console.log(`stderr: ${stderr}`);
			return stderr;
		} else {
			console.log(`Output: ${stdout}`);
			return stdout;
		}
	});
}

async function push(gitPush = `git push`) {
	await exec(`${gitPush}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return error;
		} if (stderr) {
			console.log(`stderr: ${stderr}`);
			return stderr;
		} else {
			console.log(`Output: ${stdout}`);
			return stdout;
		}
	});
}


function quickPush() {
	db.serialize(function() {
		add();
		console.log('1')
		commit();
		console.log('2')
		push();
		console.log('3')
	})
}

quickPush();




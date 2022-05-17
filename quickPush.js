const { exec } = require("child_process");


async function add(gitAdd = `git add --all`) {
	return new Promise((resolve, reject) => {
		exec(`${gitAdd}`, (error, stdout, stderr) => {
			if (error) {
				reject(`error: ${error.message}`);
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				reject(`stderr: ${stderr}`);
				console.log(`stderr: ${stderr}`);
			}
			resolve(`Output: ${stdout}`);
			console.log(`Output: ${stdout}`);
		});
	});
	}

async function commit(gitCommit, comment = `"GB"`) {
	return new Promise((resolve, reject) => {
		exec(`${gitCommit} ${comment}`, (error, stdout, stderr) => {
			if (error) {
				reject(`error: ${error.message}`);
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				reject(`stderr: ${stderr}`);
				console.log(`stderr: ${stderr}`);
			}
			resolve(`Output: ${stdout}`);
			console.log(`Output: ${stdout}`);
		});
	});
}

async function push(gitPush = `git push`) {
	return new Promise((resolve, reject) => {
		exec(`${gitPush}`, (error, stdout, stderr) => {
			if (error) {
				reject(`error: ${error.message}`);
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				reject(`stderr: ${stderr}`);
				console.log(`stderr: ${stderr}`);
			}
			resolve(`Output: ${stdout}`);
			console.log(`Output: ${stdout}`);
		});
	});
}

async function quickPush(comment = `"GB"`) {
		try {
			await add();
			await commit(`git commit -m `, comment);
			await push();
		} catch (e) {
			console.error(e);
		}
}

quickPush("1:40");
//1:40
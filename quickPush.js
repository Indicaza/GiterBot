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

async function quickPush() {
		await add();
		await commit();
		await push();
}

quickPush();
//2:13 Test2

const { exec } = require('child_process');

async function add(gitAdd = `git add --all`) {
	exec(`${gitAdd}`, (error, stdout, stderr) => {
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

async function commit(gitCommit, comment = "GB") {
	exec(`${gitCommit} ${comment}`, (error, stdout, stderr) => {
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
	exec(`${gitPush}`, (error, stdout, stderr) => {
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

async function quickPush(comment) {
	try {
		await add();
		await commit(`git commit -m "${comment}"`);
		await push();
	} catch (e) {
		console.error(e);
	}
}

quickPush('Non stop database function setup');
//2:13 Test2

const { exec } = require("child_process");

// function quickPush() {
// 	// Promise.all([add(), commit(), push()]);
// 	return 0;
// }

async function add(gitAdd = `git add --all`) {
		exec(`${gitAdd}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`Output: ${stdout}`);
		});
	}

async function commit(gitCommit = `git commit -m` , comment = `"GB"`) {
		exec(`${gitCommit} ${comment}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`Output: ${stdout}`);
		});
	}

async function push(gitPush = `git push`) {
		exec(`${gitPush}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`Output: ${stdout}`);
		});
	}

async function quickPush() {
	await add();
	await commit();
	await push();
}

quickPush()


//TEST2
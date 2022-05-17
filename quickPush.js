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

async function commit(gitCommit, comment = `"GB"`) {
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

async function quickPush(comment = `"GB"`) {
	await add();
	await commit( `git commit -m `,comment);
	await push();
}

quickPush("test2")


//TEST2
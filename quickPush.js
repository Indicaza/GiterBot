const { exec } = require("child_process");

// async function quickPush() {

	let gitAdd = `git add --all`;
	let gitCommit = `git Commit -m "(GB)"`;
	let gitPush = `git push --all`;

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

	exec(`${gitCommit}`, (error, stdout, stderr) => {
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
// }

// quickPush();
//test1
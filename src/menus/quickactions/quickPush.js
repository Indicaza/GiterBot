//
//rm -f .git/index.lock
//
const { execSync } = require('child_process');


function add(gitAdd = `git add --all`) {
	execSync(`${gitAdd}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`)
			return error;
		} if (stderr) {
			console.log(`stderr: ${stderr}`)
			return stderr;
		} else {
			console.log(`Output: ${stdout}`)
			return stdout;
		}
	});
}

function commit(gitCommit = `git commit -m`, comment = `"GB"`) {
	execSync(`${gitCommit} ${comment}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`)
			return error;
		} if (stderr) {
			console.log(`stderr: ${stderr}`)
			return stderr;
		} else {
			console.log(`Output: ${stdout}`)
			return stdout;
		}
	})
}

function push(gitPush = `git push`) {
	execSync(`${gitPush}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`)
			return error;
		} if (stderr) {
			console.log(`stderr: ${stderr}`)
			return stderr;
		} else {
			console.log(`Output: ${stdout}`)
			return stdout;
		}
	})
}


(function quickPush() {
	add()
	console.log('1')
	commit()
	console.log('2')
	push()
	console.log('3')
})()

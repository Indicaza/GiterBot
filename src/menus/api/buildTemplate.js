//
//
//
const { execSync } = require("child_process");

//When second parameter is set to true, new repo will be made private
function buildTemplate(newRepoName, username, templateRepo, isPrivate = false) {
	if (isPrivate === false) {
		execSync(
			`gh repo create ${newRepoName} --public --template=https://github.com/${username}/${templateRepo}`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			}
		)
	} else if (isPrivate === true) {
		execSync(
			`gh repo create ${newRepoName} --public --template=https://github.com/${username}/${templateRepo}`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			}
		)
	} else {
		console.log(`buildNew: ${isPrivate} Must Be Boolean`)
		return false;
	}
}


module.exports = { buildTemplate };

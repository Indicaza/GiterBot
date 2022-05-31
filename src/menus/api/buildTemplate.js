//
//
//
const { execSync } = require("child_process");


function buildTemplate(newRepoName, username, templateRepo) {
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
}



module.exports = { buildTemplate };

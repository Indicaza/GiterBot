//
//
//
const { execSync } = require("child_process");

//When second parameter is set to true, new repo will be made private
function buildAlias(alias, command, isGlobal = true) {
    if (isGlobal === true) {
        execSync(
            `git config --global alias.${alias} ${command}`,
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
    } else if (isGlobal === false) {
        execSync(
            `git config --local alias.${alias} ${command}`,
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
        console.log(`buildNew: ${isGlobal} Must Be Boolean`)
        return false;
    }
}
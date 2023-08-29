import inquirer from 'inquirer';
import { exec } from 'child_process';
import { scripts } from '../package.json';

const scriptNames = Object.keys(scripts).filter(script => script !== "interactive"); // Exclude the interactive script itself

console.log('blah')
console.log(scriptNames);

inquirer.prompt([
  {
    type: 'list',
    name: 'npmScript',
    message: 'Which npm script would you like to run?',
    choices: scriptNames
  }
]).then(answers => {
  exec(`npm run ${answers.npmScript}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
});

import autoCompletePrompt from 'inquirer-autocomplete-prompt';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import packageJson from '../package.json' assert { type: "json" };

// Register the autocomplete prompt
inquirer.registerPrompt('autocomplete', autoCompletePrompt);

const runScript = async () => {
  const { script } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'script',
      message: 'Which npm script would you like to run?',
      source: (answersSoFar, input) => {
        input = input || '';
        return new Promise((resolve) => {
          const matches = Object.keys(packageJson.scripts).filter((script) =>
            script.includes(input)
          );
          resolve(matches);
        });
      },
    },
  ]);

  const cmd = `npm run ${script}`;
  console.log(`Running: ${cmd}`);
  // Execute the selected npm script
 execSync(cmd, { stdio: 'inherit' });
};

runScript();
/* eslint-disable no-console */
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });
const processInput = async () => {
  const classNameString = await rl.question('Enter className string: ');
  const clsxOutput = classNameString.split(' ').reduce((acc, className) => `${acc}\n'${className}',`, '');
  console.log(clsxOutput);
  rl.close();
};
processInput();

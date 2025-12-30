import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { encryptFile, decryptFile } from './crypto.js';

const program = new Command();

export function encryptCommand() {
  program
    .command('encrypt')
    .alias('e')
    .alias('enc')
    .requiredOption('-i, --input <file>', 'Input path')
    .requiredOption('-o, --output <file>', 'Output path')
    .option('-s, --silent', 'Silent output verbosity')
    .option('--dev', 'Dev output verbosity')
    .action(async (options) => {
      const inputPath = path.resolve(process.cwd(), options.input);
      const outputPath = path.resolve(process.cwd(), options.output);

      const answer = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'Password:',
          mask: true,
        },
      ]);

      encryptFile(inputPath, outputPath, answer.password);
    });
}

export function decryptCommand() {
  program
    .command('decrypt')
    .alias('d')
    .alias('dec')
    .requiredOption('-i, --input <file>', 'Input path')
    .requiredOption('-o, --output <file>', 'Output path')
    .option('-s, --silent', 'Silent output verbosity')
    .option('--dev', 'Dev output verbosity')
    .action(async (options) => {
      const inputPath = path.resolve(process.cwd(), options.input);
      const outputPath = path.resolve(process.cwd(), options.output);

      const answer = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'Password:',
          mask: true,
        },
      ]);

      decryptFile(inputPath, outputPath, answer.password);
    });
}

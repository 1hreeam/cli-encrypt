import type { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { encryptFile, decryptFile } from './crypto.js';
import { resolveLogLevel, Logger } from './utils/logger.js';
import { resolveOutputPath } from './utils/naming.js';

export function encryptCommand(program: Command) {
  program
    .command('encrypt')
    .alias('e')
    .alias('enc')
    .requiredOption('-i, --input <file>', 'Input path')
    .option('-o, --output <file>', 'Output path')
    .option('-s, --silent', 'Silent output verbosity')
    .option('-v, --verbose <number>', 'Output verbosity level', parseInt)
    .action(async (options) => {
      const inputPath = path.resolve(process.cwd(), options.input);
      const outputPath = resolveOutputPath(options.output, inputPath, 'enc');

      const logLevel = resolveLogLevel(options.silent, options.verbose);
      const logger = new Logger(logLevel);

      const answer = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'Password:',
          mask: true,
        },
      ]);

      encryptFile(inputPath, outputPath, answer.password, logger);
    });
}

export function decryptCommand(program: Command) {
  program
    .command('decrypt')
    .alias('d')
    .alias('dec')
    .requiredOption('-i, --input <file>', 'Input path')
    .requiredOption('-o, --output <file>', 'Output path')
    .option('-s, --silent', 'Silent output verbosity')
    .option('-v, --verbose <number>', 'Output verbosity level')
    .action(async (options) => {
      const inputPath = path.resolve(process.cwd(), options.input);
      const outputPath = resolveOutputPath(options.output, inputPath, 'dec');

      const logLevel = resolveLogLevel(options.silent, options.verbose);
      const logger = new Logger(logLevel);

      const answer = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'Password:',
          mask: true,
        },
      ]);

      decryptFile(inputPath, outputPath, answer.password, logger);
    });
}

#!/usr/bin/env node

import { Command } from 'commander';
import { decryptCommand, encryptCommand } from './commands.js';

const program = new Command();

program.name('cli-encrypt').description('Encrypt and decrypt files').version('1.0.0');

encryptCommand(program);
decryptCommand(program);

program.parse();

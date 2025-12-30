import chalk from 'chalk';
import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import ora from 'ora';

const ora_delay = 300;

export async function encryptFile(inputPath: string, outputPath: string, password: string) {
  const inputBuffer = readFileSync(inputPath);

  const spinnerIV = ora('Generating initialization vector...').start();
  // IV - Initialization Vector
  const iv = crypto.randomBytes(12);
  const salt = crypto.randomBytes(16);

  await new Promise((r) => setTimeout(r, ora_delay));
  spinnerIV.succeed('Generated Initialization Vector');

  const spinnerKey = ora('Generating key...').start();

  const key = crypto.scryptSync(password, salt, 32);

  await new Promise((r) => setTimeout(r, ora_delay));
  spinnerKey.succeed('Generated Key');

  const spinnerEncrypting = ora('Encrypting data...').start();

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(inputBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const outputBuffer = Buffer.concat([iv, salt, authTag, encrypted]);
  writeFileSync(outputPath, outputBuffer);

  await new Promise((r) => setTimeout(r, ora_delay));
  spinnerEncrypting.succeed(chalk.greenBright('Encrypted sucessfully'));
}

export async function decryptFile(inputPath: string, outputPath: string, password: string) {
  const inputBuffer = readFileSync(inputPath);

  const spinner1 = ora('Retrieving encryption data...');

  const iv = inputBuffer.subarray(0, 12);
  const salt = inputBuffer.subarray(12, 28);
  const authTag = inputBuffer.subarray(28, 44);
  const cipherText = inputBuffer.subarray(44);

  await new Promise((r) => setTimeout(r, ora_delay));
  spinner1.succeed('Retrieved encryption bytes');

  const spinnerKey = ora('Generating key...').start();

  const key = crypto.scryptSync(password, salt, 32);

  await new Promise((r) => setTimeout(r, ora_delay));
  spinnerKey.succeed('Generated Key');

  const spinnerDec = ora('Decrypting...').start();

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  try {
    decipher.setAuthTag(authTag);
  } catch (err) {
    spinnerDec.fail(chalk.redBright('Decryption failed'));
    throw new Error('Decryption failed: wrong authTag');
  }

  let decrypted: Buffer;
  try {
    decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  } catch (err) {
    spinnerDec.fail(chalk.redBright('Decryption failed'));
    throw new Error('Decryption failed: wrong password or corrupted file');
  }

  writeFileSync(outputPath, decrypted);
  spinnerDec.succeed(chalk.greenBright('Decrypted sucessfully'));
}

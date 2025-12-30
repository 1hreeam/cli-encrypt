import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import type { Logger } from './utils/logger.js';

const ora_delay = 200;

export async function encryptFile(
  inputPath: string,
  outputPath: string,
  password: string,
  logger: Logger
) {
  const inputBuffer = readFileSync(inputPath);

  logger.trace('Loaded the file into the buffer');

  // IV - Initialization Vector
  const iv = crypto.randomBytes(12);
  const salt = crypto.randomBytes(16);

  logger.info('Generated IV');

  const key = crypto.scryptSync(password, salt, 32);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(inputBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  logger.trace('Created key and authTag');

  const outputBuffer = Buffer.concat([iv, salt, authTag, encrypted]);
  writeFileSync(outputPath, outputBuffer);

  logger.info('Encrypted successfully');
}

export async function decryptFile(
  inputPath: string,
  outputPath: string,
  password: string,
  logger: Logger
) {
  const inputBuffer = readFileSync(inputPath);

  const iv = inputBuffer.subarray(0, 12);
  const salt = inputBuffer.subarray(12, 28);
  const authTag = inputBuffer.subarray(28, 44);
  const cipherText = inputBuffer.subarray(44);

  logger.trace('Retieved secret data from the file');

  const key = crypto.scryptSync(password, salt, 32);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

  logger.trace('Generated key');

  try {
    decipher.setAuthTag(authTag);
  } catch (err) {
    logger.error('Decryption failed');
    throw new Error('Decryption failed: wrong authTag');
  }

  let decrypted: Buffer;
  try {
    decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  } catch (err) {
    logger.error('Decryption failed');
    throw new Error('Decryption failed: wrong password or corrupted file');
  }

  writeFileSync(outputPath, decrypted);
  logger.info('Decrypted successfully');
}

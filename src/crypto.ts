import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
 
export function encryptFile(inputPath: string, outputPath: string, password: string) {
    const inputBuffer = readFileSync(inputPath)
    
    // IV - Initialization Vector
    const iv = crypto.randomBytes(12)
    const salt = crypto.randomBytes(16)

    const key = crypto.scryptSync(password, salt, 32)

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
    const encrypted = Buffer.concat([cipher.update(inputBuffer), cipher.final()])
    const authTag = cipher.getAuthTag()

    const outputBuffer = Buffer.concat([iv, salt, authTag, encrypted])
    writeFileSync(outputPath, outputBuffer)
}

export function decryptFile(inputPath: string, outputPath: string, password: string) {
    const inputBuffer = readFileSync(inputPath)

    const iv = inputBuffer.subarray(0, 12)
    const salt = inputBuffer.subarray(12, 28)
    const authTag = inputBuffer.subarray(28, 44)
    const cipherText = inputBuffer.subarray(44)

    const key = crypto.scryptSync(password, salt, 32)

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
    decipher.setAuthTag(authTag)

    let decrypted: Buffer
    try {
        decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()])
    } catch (err) {
        throw new Error("Decryption failed: wrong password or corrupted file")        
    }

    writeFileSync(outputPath, decrypted)
}
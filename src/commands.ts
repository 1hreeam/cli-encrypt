import type { Command } from "commander";
import path from "path";
import { encryptFile, decryptFile } from "./crypto.js";

export function encryptCommand(program: Command) {
    program
        .command("encrypt")
        .requiredOption("-i, --input <file>", "Input path")
        .requiredOption("-o, --output <file>", "Output path")
        .requiredOption("-p, --password <password>", "Password for encryption")
        .action((options) => {
            const inputPath = path.resolve(process.cwd(), options.input)
            const outputPath = path.resolve(process.cwd(), options.output)
            encryptFile(inputPath, outputPath, options.password)
        })
}

export function decryptCommand(program: Command) {
    program
        .command("decrypt")
        .requiredOption("-i, --input <file>", "Input path")
        .requiredOption("-o, --output <file>", "Output path")
        .requiredOption("-p, --password <password>", "Password for decryption")
        .action((options) => {
            const inputPath = path.resolve(process.cwd(), options.input)
            const outputPath = path.resolve(process.cwd(), options.output)
            decryptFile(inputPath, outputPath, options.password)
        })
}
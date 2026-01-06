import path from 'path';

type Mode = 'dec' | 'enc';

export function resolvePaths(outputArg: string, inputArg: string, mode: Mode): string[] {
  const inputPath = path.resolve(process.cwd(), inputArg);

  let outputPath;
  if (!outputArg) {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const base = path.basename(inputPath);

    const outputFile = ext ? `${base}.${mode}${ext}` : `${base}.${mode}`;
    outputPath = path.resolve(dir, outputFile);
  } else {
    outputPath = path.resolve(process.cwd(), outputArg);
  }

  return [inputPath, outputPath];
}

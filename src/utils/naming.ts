import path from 'path';

type Mode = 'dec' | 'enc';

export function resolveOutputPath(outputArg: string, inputPath: string, mode: Mode): string {
  if (!outputArg) {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const base = path.basename(inputPath);

    const outputFile = ext ? `${base}.${mode}${ext}` : `${base}.${mode}`;
    return path.resolve(dir, outputFile);
  } else {
    return path.resolve(process.cwd(), outputArg);
  }
}

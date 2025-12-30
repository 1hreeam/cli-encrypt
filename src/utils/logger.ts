import chalk from 'chalk';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4,
}

export class Logger {
  constructor(private level: LogLevel) {}

  error(msg: string) {
    if (this.level >= LogLevel.ERROR) {
      console.error(chalk('[ERROR]'), msg);
    }
  }

  warn(msg: string) {
    if (this.level >= LogLevel.WARN) {
      console.warn(chalk.yellow('[WARN]'), msg);
    }
  }

  info(msg: string) {
    if (this.level >= LogLevel.INFO) {
      console.log('[INFO]', msg);
    }
  }

  debug(msg: string) {
    if (this.level >= LogLevel.DEBUG) {
      console.log(chalk.green('[DEBUG]'), msg);
    }
  }

  trace(msg: string) {
    if (this.level >= LogLevel.TRACE) {
      console.log(chalk.dim('[TRACE]', msg));
    }
  }
}

export function resolveLogLevel(silent?: boolean, verbose?: number): LogLevel {
  if (silent) return LogLevel.ERROR;
  if (verbose && verbose >= 2) return LogLevel.TRACE;
  if (verbose === 1) return LogLevel.DEBUG;
  return LogLevel.INFO;
}

export function validateVerboseOption(verbose: number) {
  if (verbose > 4) return false;
  return true;
}

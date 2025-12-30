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
      console.error(msg);
    }
  }

  warn(msg: string) {
    if (this.level >= LogLevel.WARN) {
      console.warn(msg);
    }
  }

  info(msg: string) {
    if (this.level >= LogLevel.INFO) {
      console.log(msg);
    }
  }

  debug(msg: string) {
    if (this.level >= LogLevel.DEBUG) {
      console.log(msg);
    }
  }

  trace(msg: string) {
    if (this.level >= LogLevel.TRACE) {
      console.log(msg);
    }
  }
}

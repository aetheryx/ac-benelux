import chalk from 'chalk';
import { Console } from 'console';

const LogLevels = {
  info: chalk.green,
  warn: chalk.yellow,
  error: chalk.red,
} as const;

export class Logger {
  private console: Console;
  private identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
    this.console = new Console({
      stdout: process.stdout,
      stderr: process.stderr,
      colorMode: true,
    });
  }

  public log(level: keyof typeof LogLevels, ...things: any[]): void {
    things.unshift(
      LogLevels[level](`[${level} | ${new Date().toLocaleString()} | ${this.identifier}]`)
    );

    this.console.log(...things);
  }

  public info(...things: any[]): void {
    return this.log('info', ...things);
  }

  public warn(...things: any[]): void {
    return this.log('warn', ...things);
  }

  public error(...things: any[]): void {
    return this.log('error', ...things);
  }
}

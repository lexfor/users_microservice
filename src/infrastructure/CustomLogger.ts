import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';

export class CustomLogger implements LoggerService {
  private readonly fd: number;
  constructor() {
    this.fd = fs.openSync(`./logs/${new Date().toISOString()}logs`, 'a');
  }
  log(message: any, ...optionalParams: any[]) {
    fs.writeSync(
      this.fd,
      `$Logs: ${message} module: ${optionalParams.toString()}\n`,
    );
  }
  error(message: any, ...optionalParams: any[]) {
    fs.writeSync(
      this.fd,
      `Error: ${message} module: ${optionalParams.toString()}\n`,
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    fs.writeSync(
      this.fd,
      `Warning: ${message} module: ${optionalParams.toString()}\n`,
    );
  }
  debug?(message: any, ...optionalParams: any[]) {
    fs.writeSync(
      this.fd,
      `Debug: ${message} module: ${optionalParams.toString()}\n`,
    );
  }
  verbose?(message: any, ...optionalParams: any[]) {}
}

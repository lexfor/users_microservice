import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';

export class CustomLogger implements LoggerService {
  private readonly fd: number;
  constructor() {
    console.log(fs.realpath);
    this.fd = fs.openSync(`../../logs/${new Date().toISOString()}logs`, 'a');
  }
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
    console.log(optionalParams);
    fs.writeSync(this.fd, message);
  }
  error(message: any, ...optionalParams: any[]) {
    console.log(message);
    console.log(optionalParams);
    fs.writeSync(this.fd, `ERROR:${message}`);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
    console.log(optionalParams);
    fs.writeSync(this.fd, `WARNING:${message}`);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log(message);
    console.log(optionalParams);
    fs.writeSync(this.fd, `DEBUG:${message}`);
  }
  verbose?(message: any, ...optionalParams: any[]) {}
}

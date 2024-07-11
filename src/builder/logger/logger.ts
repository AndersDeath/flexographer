import { LOGGER_DICTIONARY } from "./logger.dictionary";
import * as fs from "fs-extra";

export interface LoggerConfig {
  logFilePath: string;
  consoleLog: boolean;
}

export class Logger {
  logFilePath: string = "./builder3-logs.log";
  logJsonFilePath: string = "./builder3-logs.json";

  consoleLog: boolean = false;

  private static instance: Logger;

  constructor(config?: any) {
    if (config) {
      this.logFilePath = config.logFilePath;
      this.consoleLog = config.consoleLog;
    }
    this.createLogFilesIfNotExist();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public info(messageCode: string): void {
    if (!LOGGER_DICTIONARY[messageCode]) {
      this.log("Logger: no message in dictionary");
      return;
    }
    this.log("Info: " + LOGGER_DICTIONARY[messageCode]);
  }

  public log(message: string): void {
    let messageToLog = "Log: " + message;
    if (this.consoleLog) {
      console.log(messageToLog);
    }
    this.writeToFile(messageToLog);
  }

  public time(message: string): void {
    console.time("Time log: " + message);
  }

  public timeEnd(message: string): void {
    let messageToLog = "Time log: " + message;
    console.timeEnd(messageToLog);
    this.writeToFile(messageToLog);
  }

  public throwError(message: string): void {
    let messageToLog = "Error: " + message;
    if (this.consoleLog) {
      console.log(messageToLog);
    }
    this.writeToFile(messageToLog);
    throw new Error(messageToLog);
  }

  public async clearLogs(): Promise<void> {
    await fs.writeFile(this.logFilePath, "", "utf8");
  }

  private getDate() {
    return new Date().toISOString();
  }

  private async writeToFile(message: string) {
    const time = this.getDate();
    await fs.appendFile(
      this.logFilePath,
      time + " " + message + "\n",
      "utf8"
    );

    const jsonLog = JSON.parse(fs.readFileSync(this.logJsonFilePath, "utf8"));
    jsonLog.unshift({
      time: time,
      type: message.split(":")[0].trim(),
      message: message.split(":")[1].trim()
    });
    fs.writeFileSync(this.logJsonFilePath, JSON.stringify(jsonLog, null, "\t"), "utf8");

  }

  private async createLogFilesIfNotExist() {
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, "", "utf8");
    }
    if (!fs.existsSync(this.logJsonFilePath)) {
      fs.writeFileSync(this.logJsonFilePath, "[]", "utf8");
    }
  }
}

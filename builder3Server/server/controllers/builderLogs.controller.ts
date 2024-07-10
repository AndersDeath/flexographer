import fs from "fs-extra";
import { Request, Response } from "express";
import { Controller } from "../models/controller.model";

export const builderLogsController: Controller = {
  route: "/builder/logs",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      const [page, logFile] = await Promise.all([
        fs.readFile("./builder3Server/templates/logs.html", "utf-8"),
        fs.readFile("./builder3-logs.log", "utf-8")
      ]);

      const logs: string = `<div>${logFile.split("\n").join("</br>")}</div>`;
      const output = page.replace(/put_logs_here/g, logs);

      res.send(output);
    } catch (error) {
      res.status(500).send("Error reading log files.");
    }
  }
};

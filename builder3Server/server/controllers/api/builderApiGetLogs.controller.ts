import { Request, Response } from "express";
import { Controller } from "../../models/controller.model";
import fs from "fs-extra";

export const builderApiGetLogsController: Controller = {
  route: "/builder/api/logs",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      const log = fs.readFileSync("./builder3-logs.json", "utf8");
      res.setHeader("Content-Type", "application/json");
      res.send(log);
    } catch (error) {
      console.log(error);
      res.status(404).send("Not found");
    }
  }
};

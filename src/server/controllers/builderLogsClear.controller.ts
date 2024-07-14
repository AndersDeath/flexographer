import { Request, Response } from "express";
import { Logger } from "../../builder/logger/logger";
import { Controller } from "../models/controller.model";

export const builderLogsClearController: Controller = {
  route: "/builder/logs/clear",
  method: 'GET',
  controller: async (req: Request, res: Response): Promise<void> => {
    const logger: Logger = new Logger();
    await logger.clearLogs();
    res.redirect("/builder/logs");
  }
};
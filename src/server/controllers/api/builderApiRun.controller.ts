import { Request, Response } from "express";
import { Logger } from "../../../builder/logger/logger";
import { B3 } from "../../b3";

import { fetchBodyParams } from "../../utils/fetchBodyParams";
import { Controller } from "../../models/controller.model";

export const builderApiRunController: Controller = {
  route: "/builder/api/run",
  method: "POST",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      const { targets, categories } = fetchBodyParams(req);
      const logger: Logger = new Logger();
      logger.log("The Builder Runner has started!");
      logger.time("Builder working timer");

      B3.run({
        targets: JSON.parse(targets || "[]"),
        bookSettings: {
          categories: JSON.parse(categories || "[]")
        },
        sourcePath: "./content"
      }).then(() => {
        logger.log("The work of script finished");
        logger.timeEnd("Builder working timer");
        res.send({ status: "success" });

      });
    } catch (error: any) {
      res.status(500);
    }

  }
};
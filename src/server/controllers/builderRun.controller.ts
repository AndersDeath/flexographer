import fs from "fs-extra";
import { Request, Response } from "express";
import { Logger } from "../../builder/logger/logger";
import { B3 } from "../b3";
import { Controller } from "../models/controller.model";

export const builderRunController: Controller = {
  route: "/builder/run",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    let targets: string[] = [];
    let categories: string[] = [];
    if (req.query.targets) {
      targets = req.query.targets.toString().split(",");
    }
    if (req.query.categories) {
      categories = req.query.categories.toString().split(",");
    }

    const page = fs.readFileSync(
      "./builder3Server/templates/generation-run.html",
      "utf-8"
    );
    const logger: Logger = new Logger();
    logger.log("The Builder Runner has started!");
    logger.time("Builder working timer");

    B3.run({
      targets,
      bookSettings: {
        categories
      },
      sourcePath: './content'
    }).then((): void => {
      logger.log("The work of script finished");
      logger.timeEnd("Builder working timer");
    });

    res.send(page);
  }
};
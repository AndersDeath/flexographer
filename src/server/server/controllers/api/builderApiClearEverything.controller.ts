import { Request, Response } from "express";
import { Controller } from "../../models/controller.model";
import fs from "fs-extra";

export const builderApiClearEverythingController: Controller = {
  route: "/builder/api/clear-everything",
  method: "POST",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      await fs.remove("./static2");
      await fs.remove("./markdown2");
      await fs.remove("./temp");
      await fs.remove("./builder3-logs.log");
      await fs.remove("./builder3-logs.json");
      res.send({ status: "success" });
    } catch (error: any) {
      res.status(500);
    }

  }
};
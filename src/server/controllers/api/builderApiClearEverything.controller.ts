import { Request, Response } from "express";
import { Controller } from "../../models/controller.model";
import fs from "fs-extra";

const removeDirIfExists = async (path: string) => {
  if (fs.existsSync(path)) {
    await fs.remove(path);
  }
}

export const builderApiClearEverythingController: Controller = {
  route: "/builder/api/clear-everything",
  method: "POST",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      await removeDirIfExists('./static2');
      await removeDirIfExists('./markdown2');
      await removeDirIfExists('./temp');
      await removeDirIfExists('./output');
      await removeDirIfExists('./builder3-logs.log');
      await removeDirIfExists('./builder3-logs.json');
      res.send({ status: "success" });
    } catch (error: any) {
      res.status(500);
    }

  }
};
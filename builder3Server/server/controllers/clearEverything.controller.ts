import fs from "fs-extra";
import { Request, Response } from "express";
import { Controller } from "../models/controller.model";

export const clearEverythingController: Controller = {
  route: "/clear-everything",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    await fs.remove("./static2");
    await fs.remove("./markdown2");
    await fs.remove("./temp");
    await fs.remove("./builder3-logs.log");
    res.redirect("/");
  }
};
import { Request, Response } from "express";
import { B3 } from "../b3";
import { Controller } from "../models/controller.model";

export const indexController: Controller = {
  route: "/",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    // const categories: string[] = B3.categories;
    // const targets: string[] = B3.targets;
    res.render("pages/index");
  }
};
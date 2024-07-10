import { Request, Response } from "express";
import { Controller } from "../../models/controller.model";
import { B3 } from "../../b3";

export const builderApiGetCategoriesController: Controller = {
  route: "/builder/api/get/categories",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.send(B3.categories);
    } catch (error) {
      console.log(error);
      res.status(404).send("Not found");
    }
  }
};

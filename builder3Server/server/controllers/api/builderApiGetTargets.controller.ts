import { Request, Response } from "express";
import { Controller } from "../../models/controller.model";
import { B3 } from "../../b3";

export const builderApiGetTargetsController: Controller = {
  route: "/builder/api/get/targets",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.send(B3.targets);
    } catch (error) {
      console.log(error);
      res.status(404).send("Not found");
    }
  }
};

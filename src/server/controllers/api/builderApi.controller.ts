import { Request, Response } from "express";
import { Controller } from "../../models/controller.model";
import { fetchBodyParams } from "../../utils/fetchBodyParams";

export const builderApiController: Controller = {
  route: "/builder/api",
  method: "POST",
  controller: async (req: Request, res: Response): Promise<void> => {
    const { example } = fetchBodyParams(req);
    console.log(example);
    res.send({ response: "api works", example });
  }
};

import { Request } from "express";

export const fetchBodyParams = (req: Request): any => {
  return req.body;
};
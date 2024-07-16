import { Request, Response } from "express";

export class Controller {
  route: string;
  method: string;
  middleware?: any;
  controller: (req: Request, res: Response) => Promise<void>;
}
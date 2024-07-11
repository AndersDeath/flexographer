import { Request, Response } from "express";

export class Controller {
  route: string;
  method: string;
  controller: (req: Request, res: Response) => Promise<void>;
}
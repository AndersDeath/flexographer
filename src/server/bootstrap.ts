import express, {Request, Response} from "express";
import {Controllers} from "./controllers";
import {Controller} from "./models/controller.model";

export const routesInit = (app: any): void => {

    app.use("/static", express.static("static"));

    Controllers.forEach((element: Controller): void => {
        if (element.method === "GET") {
            app.get(element.route, async (req: Request, res: Response): Promise<void> => {
                await element.controller(req, res);
            })
        }
        if (element.method === "POST") {
            if (element.middleware) {
                app.post(element.route, element.middleware, async (req: Request, res: Response): Promise<void> => {
                    await element.controller(req, res);
                })
            } else {
                app.post(element.route, async (req: Request, res: Response): Promise<void> => {
                    await element.controller(req, res);
                })
            }
        }
    });
};

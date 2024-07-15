import {Request, Response} from "express";
import {Controller} from "../models/controller.model";
import {fetchBodyParams} from "../utils/fetchBodyParams";

export const markdownSourceFilesController: Controller = {
    route: "/api/markdown-source-files",
    method: "POST",
    controller: async (req: Request, res: Response): Promise<void> => {
        // req.on("data", (chunk) => {
        //     console.log(chunk)
        // });
        //
        // req.on("end", () => {
        //     let fileData = Buffer.concat(data);
        //
        //     console.log(fileData)
        // });
        // const data = fetchBodyParams(req);
        // console.log(data);

    }
};
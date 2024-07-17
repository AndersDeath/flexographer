import {Request, Response} from "express";
import {Controller} from "../models/controller.model";
import {fetchBodyParams} from "../utils/fetchBodyParams";
import {upload} from '../storage';

export const markdownSourceFilesController: Controller = {
    route: "/api/markdown-source-files",
    method: "POST",
    middleware: upload.array('files', 50),
    controller: async (req: Request, res: Response): Promise<void> => {
        console.log(req.files)
        res.send({
            numberOfFiles: req.files
        });


        // req.on("data", (chunk) => {
        //     console.log(chunk)
        // });
        // const data = fetchBodyParams(req);
        // console.log(data);
        // req.on("end", () => {
        //     let fileData = Buffer.concat(data);
        //
        //     console.log(fileData)
        // });


    }
};
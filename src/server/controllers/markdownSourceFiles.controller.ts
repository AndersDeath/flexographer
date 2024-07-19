import {Request, Response} from "express";
import {Controller} from "../models/controller.model";
import {fetchBodyParams} from "../utils/fetchBodyParams";
import {upload} from '../storage';
import * as fs from 'fs-extra';
import {B3} from "../b3";

export const markdownSourceFilesController: Controller = {
    route: "/api/markdown-source-files",
    method: "POST",
    middleware: upload.array('files', 50),
    controller: async (req: Request, res: Response): Promise<void> => {
        const {categories, targets} = fetchBodyParams(req);
        // fs.rmSync('temp', {recursive: true, force: true});
        fs.mkdirp('temp');
        for (const file of req.files) {
            const content = fs.readFileSync(file.path, 'utf-8');
            fs.mkdirp('temp/' + categories, { recursive: true });
            fs.writeFileSync('temp/' + categories + '/' + file.originalname, content, 'utf8')
        }
        //
        setTimeout(() => {
            B3.run({
                targets,
                bookSettings: {
                    categories: [categories]
                },
                sourcePath: "./temp"
            }).then((): void => {
                // logger.log("The work of script finished");
                // logger.timeEnd("Builder working timer");
            });

        }, 1000)


        res.send({
            numberOfFiles: req.files
        });


    }
};
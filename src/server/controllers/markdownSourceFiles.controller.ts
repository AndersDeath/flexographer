import {Request, Response} from "express";
import {Controller} from "../models/controller.model";
import {fetchBodyParams} from "../utils/fetchBodyParams";
import {upload} from '../storage';
import * as fs from 'fs-extra';

export const markdownSourceFilesController: Controller = {
    route: "/api/markdown-source-files",
    method: "POST",
    middleware: upload.array('files', 50),
    controller: async (req: Request, res: Response): Promise<void> => {
        fs.rmSync('temp', {recursive: true, force: true});
        fs.mkdirp('temp');
        for (const file of req.files) {
            const content = fs.readFileSync(file.path, 'utf-8');
            fs.writeFileSync('temp/' + file.originalname, content, 'utf8')
        }

        res.send({
            numberOfFiles: req.files
        });


    }
};
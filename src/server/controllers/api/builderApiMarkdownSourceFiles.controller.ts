import {Request, Response} from "express";
import {Controller} from "../../models/controller.model";
import {fetchBodyParams} from "../../utils/fetchBodyParams";
import {upload} from '../../storage';
import * as fs from 'fs-extra';
import {B3} from "../../b3";

interface RequestWithFiles extends Request {
    files: {
        files: any;
        images: any;
    }
}

export const builderApiMarkdownSourceFilesController: Controller = {
    route: "/api/markdown-source-files",
    method: "POST",
    middleware: upload.fields([{name: 'files', maxCount: 100}, {name: 'images', maxCount: 100}]),
    controller: async (req: RequestWithFiles, res: Response): Promise<void> => {
        const {categories, targets} = fetchBodyParams(req);
        if(!fs.existsSync('./temp')) {
            fs.mkdirSync('temp');
        }

        for (const file of req.files.files) {
            fs.mkdirp('temp/' + categories, {recursive: true});
            fs.copyFileSync(file.path, 'temp/' + categories + '/' + file.originalname)
        }
        for (const file of req.files.images) {
            fs.mkdirp('temp/images', {recursive: true});
            fs.copyFileSync(file.path, 'temp/images/' + file.originalname)
        }

        B3.run({
            targets,
            bookSettings: {
                categories: [categories]
            },
            sourcePath: "./temp"
        }).then((): void => {
            console.log('Builder3 has done');
            fs.rmSync("./uploads", { recursive: true, force: true });
            // logger.log("The work of script finished");
            // logger.timeEnd("Builder working timer");
        });


        res.send({
            numberOfFiles: req.files
        });


    }
};
import express, { Request, Response } from "express";
import { B3 } from "../b3";
import { Controller } from "../models/controller.model";
import fs from 'fs-extra';

export const indexController: Controller = {
  route: "/",
  method: "GET",
  controller: async (req: Request, res: Response): Promise<void> => {
    // const categories: string[] = B3.categories;
    // const targets: string[] = B3.targets;
    const obj = [];
    if (fs.existsSync('./output')) {
      fs.readdirSync('./output').forEach(file => {
        obj.push({
          href: "/output/" + file,
          title: file
        })
      });
    }
    res.render("pages/index", {obj: obj});
  }
};
import { Builder3 } from "../builder/builder";

export const B3: Builder3 = new Builder3({
  sourceRootPath: "./content",
  htmlOutputPath: "./static2",
  markdownOutputPath: "./markdown2",
  tempFolderPath: "./temp",
  imageFolderPath: "./images"
});
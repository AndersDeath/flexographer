import * as fs from "fs-extra";
import * as path from "path";

export class Builder3FS {
  constructor() {
  }

  public async createCategoryDirectory(
    outputPath: string,
    categoryName: string,
    ignoreList: string[] = []
  ): Promise<void> {
    if (ignoreList.includes(categoryName)) return;
    return fs.mkdirp(path.join(outputPath, categoryName));
  }
}

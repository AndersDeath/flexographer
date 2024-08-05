import * as fs from "fs-extra";
import * as path from "path";
import {RunConfig} from "./models/interfaces";
import {Logger} from "./logger/logger";

export class Builder3FS {

  private logger: Logger = new Logger();

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

  public async copyArtifactsFromTempToOutput(rConf: RunConfig): Promise<void> {
    if (rConf.bookSettings.categories.length > 0) {
      fs.mkdirp("output");
      rConf.bookSettings.categories.forEach((category: string): void => {
        fs.copyFileSync(`temp/output_from_html_${category}.pdf`, `output/${category}-${Date.now()}.pdf`);
      });
    } else {
      this.logger.throwError("There are not categories in request");
    }
  }

}

import path from "path";
import {pageBreakHtml} from "./ui";

export class Utils {

  public async replaceGlobalImagePathToLocal(
      content: string
  ): Promise<string> {
    return content.replace(
        /https:\/\/raw\.githubusercontent\.com\/AndersDeath\/holy-theory\/main\/images/g,
        "./temp/images"
    );
  }

  public async replaceMarkdownPageBreakToHtml(
      content: string
  ): Promise<string> {
    return content.replace(
        /\\newpage/g,
        path.join("./", pageBreakHtml())
    );
  }

  public removeIgnoreBlock = (content: string): string => {
    const regex: RegExp = /<!-- ignore start -->(.*?)<!-- ignore end -->/g;
    content.replace(regex, "");
    return content;
  };
}

import * as fs from "fs-extra";
import * as path from "path";
import {
  Config,
  B3File,
  RawContent,
  OutputFileTypes,
  RunConfig
} from "./models/interfaces";
import { pageWrapperHtml } from "./ui/page-wrapper.html";
import { FileGroup } from "./file-group";
import { marked } from "./libs/marked";
import { Logger } from "./logger/logger";
import { Builder3FS } from "./builder-fs";
import {Pandoc, PandocInput} from "./pandoc";
import { pageBreakHtml } from "./ui";

const RunConfigDefault: RunConfig = {
  targets: [],
  bookSettings: {
    categories: []
  },
  sourcePath: './content'
};

export class Builder3 {
  private parseMDLibInstance: any;
  private rawContent: RawContent[] = [];
  private readonly config: Config;
  private logger: Logger = new Logger();
  private b3fs: Builder3FS = new Builder3FS();
  private pandoc: Pandoc = new Pandoc();

  constructor(config: Config) {
    this.logger.log("Builder constructor is initialized");
    this.config = config;
  }

  public get targets(): [string, string, string] {
    return ["md", "html", "book"];
  }

  public get categories() {
    return this.getCategories();
  }

  public async run(runConfig: RunConfig = RunConfigDefault): Promise<void> {

    if(runConfig.sourcePath) {
      this.config.sourceRootPath = runConfig.sourcePath
    }
    this.parseMDLibInstance = await this.parseMDInit();

    const rConf: RunConfig = this.runConfigResolver(runConfig);

    await this.init();

    if (runConfig.targets?.length === 0) {
      await this.buildStaticHtml();
      await this.buildStaticMD();
      await this.detectBookBookTemplateCategoriesAndBuild(rConf);
      // await this.copyImageFolder();
      await this.buildBookPdf(rConf);
      await this.copyArtifactsFromTempToOutput(rConf);
      fs.rmSync("./temp", { recursive: true, force: true });
      return;
    }

    if (rConf.targets && rConf.targets.includes("html"))
      await this.buildStaticHtml();
    if (rConf.targets && rConf.targets.includes("md"))
      await this.buildStaticMD();
    if (rConf.targets && rConf.targets.includes("book")) {
      await this.detectBookBookTemplateCategoriesAndBuild(rConf);
      // await this.copyImageFolder();
      await this.buildBookPdf(rConf);
      await this.copyArtifactsFromTempToOutput(rConf);
      fs.rmSync("./temp", { recursive: true, force: true });
    }
    return;
  }

  private async detectBookBookTemplateCategoriesAndBuild(
    rConf: RunConfig
  ): Promise<void> {
    const categories: string[] = rConf.bookSettings?.categories ?? [];
    await Promise.all(
      categories.map((element: string) => this.buildBookTemplate(element))
    );
  }

  private runConfigResolver(runConfig: RunConfig): RunConfig {
    runConfig.targets = runConfig.targets || [];
    runConfig.bookSettings = runConfig.bookSettings || { categories: [] };
    return runConfig;
  }

  private async init(): Promise<void> {
    const folders: string[] = await fs.readdir(this.config.sourceRootPath);
    for (const folder of folders) {
      const folderPath: string = path.join(this.config.sourceRootPath, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const sourceFiles: B3File[] = await this.parseFolder(folderPath);
        const parsedContentWithCategory: RawContent[] = await Promise.all(
          sourceFiles.map((file: B3File) => this.parseRawContent(folder, file))
        );
        this.rawContent.push(...parsedContentWithCategory);
      }
    }
    this.logger.log(`${this.rawContent.length} content items are parsed`);
  }

  private getCategories():string[] {
    const folders: string[] = fs.readdirSync(this.config.sourceRootPath);
    return folders.filter((folder: string) =>
      fs.statSync(path.join(this.config.sourceRootPath, folder)).isDirectory()
    );
  }

  private async parseMDInit(): Promise<any> {
    const module = await import("parse-md");
    const parseMD = module.default;
    return parseMD;
  }

  private parseRawContent(category: string, file: B3File): RawContent {
    const { metadata, content }: any = this.parseMDLibInstance(file.content);
    return {
      category,
      metadata,
      content,
      folderPath: "",
      fileName: file.name
    };
  }

  private async parseFolder(folderPath: string): Promise<B3File[]> {
    const files: string[] = await fs.readdir(folderPath);
    const content: B3File[] = [];

    for (const file of files) {
      const filePath: string = path.join(folderPath, file);
      if (path.extname(file) === ".md") {
        const pieceOfContent: string = await fs.readFile(filePath, "utf-8");
        content.push({
          name: file.replace(/\.[^.]+$/, ""),
          content: pieceOfContent,
          category: file,
          path: filePath,
          sort: 0,
          ignore: false
        });
      }
    }

    return content;
  }

  private async buildStaticMD(): Promise<void> {
    this.logger.log("Build static md");
    await this.buildStatic(OutputFileTypes.MD, this.config.markdownOutputPath);
  }

  private async buildStaticHtml(): Promise<void> {
    this.logger.log("Build static html");
    await this.buildStatic(OutputFileTypes.HTML, this.config.htmlOutputPath);
  }

  private async buildStatic(
    outputType: string,
    outputPath: string
  ): Promise<void> {
    this.config.outputType = outputType;
    const fileGroup: FileGroup = new FileGroup(this.config, this.rawContent);
    const files: B3File[] = await fileGroup.run();

    for (const file of files) {
      await this.b3fs.createCategoryDirectory(outputPath, file.category, [
        "all"
      ]);
      fs.writeFileSync(
        file.path,
        this.config.outputType === OutputFileTypes.HTML
          ? pageWrapperHtml(marked.parse(file.content))
          : marked.parse(file.content)
      );
    }
  }

  private async buildBookTemplate(category: string): Promise<void> {
    this.logger.log("Build prepared Html Book Template " + category);
    this.config.targetCategory = category;
    this.config.outputType = OutputFileTypes.MD;
    const fileGroup = new FileGroup(this.config, this.rawContent);
    const files: B3File[] = await fileGroup.prepareBookTemplateContent(
      "prepared-book-" + category
    );

    fs.mkdirp(this.config.tempFolderPath);
    for (const file of files) {
      file.content = await this.replaceGlobalImagePathToLocal(file.content);
      file.content = await this.removeIgnoreBlock(file.content);
      // file.content = await this.replaceMarkdownPageBreakToHtml(file.content);
      fs.writeFileSync(file.path, file.content);
    }
  }

  private removeIgnoreBlock = (content: string): string => {
    const regex: RegExp = /<!-- ignore start -->(.*?)<!-- ignore end -->/g;
    content.replace(regex, "");
    return content;
  };

  private async buildBookPdf(rConf: RunConfig): Promise<void> {
    if (rConf.bookSettings.categories.length > 0) {
      for (const category of rConf.bookSettings.categories) {
        const config: PandocInput = {
          inputPath: `temp/prepared-book-${category}.md`,
          outputPath: `temp/output_from_html_${category}.pdf`,
          isTableOfContents: true,
          metadataFile: rConf.sourcePath+ `/${category}/pandoc-config.yaml`
        };
        await this.pandoc.generate(config);
      }
    } else {
      this.logger.throwError("There are not categories in request");
    }

  }

  private async copyImageFolder(): Promise<void> {
    await fs.copy(
      this.config.imageFolderPath,
      path.join(this.config.tempFolderPath, "images")
    );
  }

  private async replaceGlobalImagePathToLocal(
    content: string
  ): Promise<string> {
    return content.replace(
      /https:\/\/raw\.githubusercontent\.com\/AndersDeath\/holy-theory\/main\/images/g,
        "./temp/images"
    );
  }

  private async replaceMarkdownPageBreakToHtml(
    content: string
  ): Promise<string> {
    return content.replace(
      /\\newpage/g,
      path.join("./", pageBreakHtml())
    );
  }

  private async copyArtifactsFromTempToOutput(rConf: RunConfig): Promise<void> {
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

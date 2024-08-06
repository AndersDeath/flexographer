export class RawContent {
  category: string;
  metadata: any;
  content: string;
  folderPath: string;
  fileName: string;
}

export class Config {
  sourceRootPath: string;
  htmlOutputPath: string;
  markdownOutputPath: string;
  outputType?: string;
  targetCategory?: string;
  tempFolderPath: string;
  imageFolderPath: string;
}

export class B3File {
  name: string;
  content: string;
  path: string;
  category: string;
  sort: number;
  ignore: boolean;
}

export enum OutputFileTypes {
  HTML = "html",
  MD = "md",
}

export class RunConfig {
  targets?: string[];
  bookSettings?: {
    categories: string[];
  };
  sourcePath: string
}

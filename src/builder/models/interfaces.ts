export interface RawContent {
  category: string;
  metadata: any;
  content: string;
  folderPath: string;
  fileName: string;
}

export interface Config {
  sourceRootPath: string;
  htmlOutputPath: string;
  markdownOutputPath: string;
  outputType?: string;
  targetCategory?: string;
  tempFolderPath: string;
  imageFolderPath: string;
}

export interface B3File {
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

export interface RunConfig {
  targets?: string[];
  bookSettings?: {
    categories: string[];
  };
  sourcePath: string
}

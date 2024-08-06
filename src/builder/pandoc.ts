const util = require("util");
const exec = util.promisify(require("child_process").exec);

export interface PandocInput {
  inputPath: string;
  outputPath: string;
  metadataFile?: string;
  isTableOfContents?: boolean;
}

export class Pandoc {
  constructor() {
  }

  async generate(input: PandocInput): Promise<any> {
    const cmd: string = this.createCommand(input);
    const { stdout, stderr } = await exec(cmd);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    return new Promise((resolve, reject) => {
      if(stderr) {
        reject(stderr)
      } else {
        resolve(stdout);
      }
     })
  }

  createCommand(input: PandocInput): string {
    return `pandoc ${input.inputPath} -o ${input.outputPath} ${
      input.isTableOfContents ? "--toc --toc-depth=1 " : ""
    } ${
      input.metadataFile ? ` --metadata-file=${input.metadataFile}` : ""
    }  -V geometry:margin=1in --highlight-style pygments  `;
  }
}

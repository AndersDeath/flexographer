import { marked } from "../libs/marked";

export const tableOfContentsMd = (markdownContent: string): string => {
  const tokens = marked.lexer(markdownContent);
  let toc = "";
  tokens.forEach((token) => {
    if (token.type === "heading" && token.depth <= 3) {
      const indent = "  ".repeat(token.depth - 1);
      const anchor = token.text.toLowerCase().replace(/[^\w]+/g, "-");
      toc += `${indent}- [${token.text}](#${anchor})\n`;
    }
  });

  return toc + "\n";
};

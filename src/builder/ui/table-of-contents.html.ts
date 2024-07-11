import { marked } from "../libs/marked";

export const tableOfContentsHtml = (markdownContent: string): string => {
  const tokens = marked.lexer(markdownContent);
  let toc = "";
  let level = 0;

  tokens.forEach((token) => {
    if (token.type === "heading" && token.depth <= 3) {
      const anchor = token.text.toLowerCase().replace(/[^\w]+/g, "-");
      if (token.depth === level) {
        toc += `<li><a href="#${anchor}">${token.text}</a></li>\n`;
      } else if (token.depth < level) {
        toc += "</ul>".repeat(level - token.depth);
        toc += `<li><a href="#${anchor}">${token.text}</a></li>\n`;
      } else {
        toc += "<ul>\n";
        toc += `<li><a href="#${anchor}">${token.text}</a></li>\n`;
      }
      level = token.depth;
    }
  });

  toc += "</ul>".repeat(level);

  return toc + "\n";
};

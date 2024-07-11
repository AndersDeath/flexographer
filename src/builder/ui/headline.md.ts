export const headlineMd = (content: string, level: number) =>
  Array(level).fill("#").join("") + " " + content;

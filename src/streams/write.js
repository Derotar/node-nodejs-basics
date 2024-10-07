import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fileToWrite.txt"
);

const write = async () => {
  const writeStream = fs.createWriteStream(filePath);
  process.stdin.pipe(writeStream);
};

await write();

import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fileToRead.txt"
);

const read = async () => {
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(process.stdout);
};

await read();

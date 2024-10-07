import * as fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fileToRead.txt"
);

const read = async () => {
  try {
    const fileContent = await fsPromises.readFile(filePath, {
      encoding: "utf-8",
    });
    console.log(fileContent);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    throw new Error("FS operation failed");
  }
};

await read();

import * as fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const oldPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "wrongFilename.txt"
);

const newPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "properFilename.md"
);

const rename = async () => {
  try {
    await fsPromises.stat(oldPath);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    throw new Error("FS operation failed");
  }

  try {
    await fsPromises.stat(newPath);
    throw new Error("FS operation failed");
  } catch (e) {
    if (e.code !== "ENOENT") throw e;

    await fsPromises.rename(oldPath, newPath);
  }
};

await rename();

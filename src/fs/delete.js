import * as fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fileToRemovePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fileToRemove.txt"
);

const remove = async () => {
  try {
    await fsPromises.rm(fileToRemovePath);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    throw new Error("FS operation failed");
  }
};

await remove();

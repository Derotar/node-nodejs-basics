import * as fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const folderPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files"
);

const list = async () => {
  try {
    const files = await fsPromises.readdir(folderPath);
    console.log(files);
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }

    throw new Error("FS operation failed");
  }
};

await list();

import * as fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const folderPathFrom = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files"
);

const folderPathTo = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files_copy"
);

const copy = async () => {
  try {
    await fsPromises.access(folderPathFrom);
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }

    throw new Error("FS operation failed");
  }

  try {
    await fsPromises.access(folderPathTo);
    throw new Error("FS operation failed");
  } catch (e) {
    if (e.code !== "ENOENT") throw e;

    await fsPromises.mkdir(folderPathTo);

    const files = await fsPromises.readdir(folderPathFrom);

    files.forEach(async (file) => {
      await fsPromises.copyFile(
        path.join(folderPathFrom, file),
        path.join(folderPathTo, file)
      );
    });
  }
};

await copy();

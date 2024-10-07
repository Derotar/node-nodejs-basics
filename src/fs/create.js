import * as fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fresh.txt"
);
const textContent = "I am fresh and young";

const create = async () => {
  try {
    await fsPromises.stat(filePath);
    throw new Error("FS operation failed");
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw new Error(e);
    }
    await fsPromises.writeFile(filePath, textContent);
  }
};

await create();

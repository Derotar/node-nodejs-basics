import { createHash } from "node:crypto";
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fileToCalculateHashFor.txt"
);

const calculateHash = async () => {
  const hash = createHash("sha256");

  const readStream = fs.createReadStream(filePath, { highWaterMark: 2 });

  readStream.on("data", (chunk) => {
    hash.update(chunk.toString());
  });

  readStream.on("end", () => {
    console.log(hash.digest("hex"));
  });
};

await calculateHash();

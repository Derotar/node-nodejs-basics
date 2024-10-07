import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip, createGunzip } from "node:zlib";
import { pipeline } from "node:stream";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "fileToCompress.txt"
);

const archivePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "archive.gz"
);

const decompress = async () => {
  const readStream = fs.createReadStream(archivePath);
  const gzip = createGunzip();
  const writeStream = fs.createWriteStream(filePath);

  await pipeline(readStream, gzip, writeStream, (err) => {
    console.error(err);
  });
};

await decompress();

import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
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

const compress = async () => {
  const readStream = fs.createReadStream(filePath);
  const gzip = createGzip();
  const writeStream = fs.createWriteStream(archivePath);

  await pipeline(readStream, gzip, writeStream, (err) => {
    console.error(err);
  });
};

await compress();

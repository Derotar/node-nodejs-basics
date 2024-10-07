import path from "node:path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";

const filePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
  "script.js"
);

const spawnChildProcess = async (args) => {
  const child = fork(filePath, args, { stdio: "pipe" });

  process.stdin.on("data", (chunk) => {
    const chunkStr = chunk.toString();
    child.stdin.write(chunkStr);
  });

  child.stdout.on("data", (chunk) => {
    const chunkStr = chunk.toString();
    process.stdout.write(chunkStr);
  });

  child.on("exit", (code) => process.exit(code));
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 3]);

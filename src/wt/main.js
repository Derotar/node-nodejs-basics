import path from "node:path";
import { fileURLToPath } from "node:url";
import { cpus } from "node:os";
import { Worker } from "worker_threads";

const workerPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "worker.js"
);

const BASE_VAL = 10;

const createWorker = async (path, workerData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path, { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

const performCalculations = async () => {
  const workerDatas = Array.from(
    { length: cpus().length },
    (_, idx) => idx + BASE_VAL
  );

  const promises = workerDatas.map((item) => createWorker(workerPath, item));

  const res = await Promise.allSettled(promises);

  console.log(
    res.map((item) => ({
      status: item.status === "fulfilled" ? "resolved" : "error",
      data: item.value ?? null,
    }))
  );
};

await performCalculations();

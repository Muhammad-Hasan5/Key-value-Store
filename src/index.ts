process.loadEnvFile();

import app from "./app.js";
import { startCompaction } from "./utils/compaction.js";
import { expiryWorker } from "./utils/expiryWorker.js";
import store from "./services/store.service.js";

console.log("Hello key-value store");

await store.init();

const port: string | undefined = process.env.PORT;

if (!port) {
  console.log("Port is not defined");
  process.exit(1);
}

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await startCompaction();
  expiryWorker(store);
});

process.loadEnvFile();
import http from "./http.js";
import { startCompaction } from "./utils/compaction.js";
import { expiryWorker } from "./utils/expiryWorker.js";
import store from "./services/store.service.js";
import tcp from "./tcp.js";
console.log("Hello key-value store");
await store.init();
//TCP server
const TCP_PORT = process.env.TCP_PORT;
tcp.listen(TCP_PORT, () => {
    console.log(`Server is running on port ${TCP_PORT}`);
});
//HTTP server
const HTTP_PORT = process.env.HTTP_PORT;
http.listen(HTTP_PORT, async () => {
    console.log(`Server is running on port ${HTTP_PORT}`);
    await startCompaction();
    expiryWorker(store);
});
//# sourceMappingURL=index.js.map
//write-ahead log
import fs from "node:fs/promises";
import path from "node:path";
const LOG_FILE = path.join(process.cwd(), "store.json");
export async function appendLog(entry) {
    try {
        await fs.appendFile(LOG_FILE, JSON.stringify(entry) + "\n");
    }
    catch (error) {
        if (error.code === "ENOENT")
            return;
        throw error;
    }
}
export async function recovery(store) {
    try {
        const data = await fs.readFile(LOG_FILE, { encoding: "utf-8" });
        const lines = data.split("\n");
        for (const line of lines) {
            if (!line)
                continue;
            const pair = JSON.parse(line);
            if (pair.method === "PUT") {
                store.set(pair.key, pair.value);
            }
            if (pair.method === "DELETE") {
                store.delete(pair.key);
            }
        }
    }
    catch (error) {
        if (error.code === "ENOENT")
            return;
        throw error;
    }
}
//# sourceMappingURL=wal.js.map
//write-ahead log
import fs from "node:fs/promises";
class WAL {
    async flush() {
        if (this.isFlushing)
            return;
        if (this.queue.length === 0)
            return;
        this.isFlushing = true;
        const batch = this.queue.splice(0, this.queue.length);
        const data = batch.map((p) => JSON.stringify(p)).join("\n") + "\n";
        try {
            await fs.appendFile(this.LOG_FILE, data);
        }
        catch (error) {
            if (error.code === "ENOENT")
                return;
            throw error;
        }
        finally {
            this.isFlushing = false;
        }
    }
    async waitUntilResume() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (!this.paused) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1);
        });
    }
    constructor() {
        this.queue = [];
        this.isFlushing = false;
        this.paused = false;
        this.LOG_FILE = String(process.env.LOG_FILE);
        setInterval(() => this.flush(), 10);
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = true;
    }
    async appendLog(entry) {
        if (this.paused) {
            await this.waitUntilResume();
        }
        this.queue.push(entry);
    }
    async recovery(store) {
        try {
            const data = await fs.readFile(this.LOG_FILE, { encoding: "utf-8" });
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
}
const wal = new WAL();
export default wal;
//# sourceMappingURL=wal.js.map
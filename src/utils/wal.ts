//write-ahead log

import fs from "node:fs/promises";
import path from "node:path";

interface pair {
  method: "PUT" | "DELETE";
  key: string;
  value?: string;
}

class WAL {
  private queue: pair[] = [];
  private isFlushing: boolean = false;
  private LOG_FILE = path.join(process.cwd(), "store.json");

  constructor() {
    setInterval(() => this.flush(), 10);
  }

  private async flush() {
    if (this.isFlushing) return;
    if (this.queue.length === 0) return;

    this.isFlushing = true;

    const batch = this.queue.splice(0, this.queue.length);

    const data = batch.map((p) => JSON.stringify(p)).join("\n") + "\n";

    try {
      await fs.appendFile(this.LOG_FILE, data);
    } catch (error: any) {
      if (error.code === "ENOENT") return;
      throw error;
    } finally {
      this.isFlushing = false;
    }
  }

  async appendLog(entry: pair) {
    this.queue.push(entry);
  }

  async recovery(store: Map<string, string>) {
    try {
      const data = await fs.readFile(this.LOG_FILE, { encoding: "utf-8" });
      const lines = data.split("\n");

      for (const line of lines) {
        if (!line) continue;

        const pair: pair = JSON.parse(line);

        if (pair.method === "PUT") {
          store.set(pair.key as string, pair.value as string);
        }

        if (pair.method === "DELETE") {
          store.delete(pair.key as string);
        }
      }
    } catch (error: any) {
      if (error.code === "ENOENT") return;
      throw error;
    }
  }
}

const wal = new WAL();

export default wal;

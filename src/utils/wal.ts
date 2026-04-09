//write-ahead log
import fs from "node:fs/promises";
import Store from "../services/store.service.js";

interface pair {
  method: "PUT" | "DELETE";
  key: string;
  value?: string;
  expiresAt?: number | undefined;
}

class WAL {
  private queue: pair[] = [];
  public isFlushing: boolean = false;
  private paused: boolean = false;
  private LOG_FILE = String(process.env.LOG_FILE);

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

  private async waitUntilResume() {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!this.paused) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  }

  constructor() {
    setInterval(() => this.flush(), 10);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = true;
  }

  async appendLog(entry: pair) {
    if (this.paused) {
      await this.waitUntilResume();
    }
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

          if (pair.expiresAt && pair.expiresAt > Date.now()) {
            Store.expiry.set(pair.key, pair.expiresAt);
            Store.heap.insert({ key: pair.key, expiresAt: pair.expiresAt });
          }
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

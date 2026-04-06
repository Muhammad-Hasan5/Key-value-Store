//write-ahead log

import fs from "node:fs/promises";
import path from "node:path";

interface pair {
  method: string;
  key: string;
  value?: string;
}

const LOG_FILE = path.join(process.cwd(), "store.json");

export async function appendLog(entry: pair) {
  try {
    await fs.appendFile(LOG_FILE, JSON.stringify(entry) + "\n");
  } catch (error: any) {
    if (error.code === "ENOENT") return;
    throw error;
  }
}

export async function recovery(store: Map<string, string>) {
  try {
    const data = await fs.readFile(LOG_FILE, { encoding: "utf-8" });
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

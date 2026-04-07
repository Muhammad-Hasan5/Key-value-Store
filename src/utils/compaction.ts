import fs from "node:fs/promises";
import store from "../services/store.service.js";
import snapshot from "../services/snapshot.service.js";
import wal from "./wal.js";

const COMPACTION_INTERVAL = 30_000;

export async function startCompaction() {
  setInterval(async () => {
    try {
      //atomic file read and write (BUG FIXED)
      wal.pause();

      while (wal.isFlushing) {
        await new Promise((r) => setTimeout(r, 1));
      }

      const tempFile = String(process.env.SNAPSHOT_FILE);
      await snapshot.writeSnapshot(store.getAll());
      await fs.rename(tempFile, String(process.env.RENAMED_SNAPSHOT_FILE));
      await fs.writeFile(String(process.env.LOG_FILE), "");
    } catch (error: any) {
      if (error.code === "ENOENT") return;
      throw error;
    } finally {
      wal.resume();
    }
  }, COMPACTION_INTERVAL);
}

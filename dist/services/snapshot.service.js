import fs from "node:fs/promises";
import Store from "./store.service.js";
class Snapshot {
    constructor() {
        this.SNAPSHOT_FILE = String(process.env.SNAPSHOT_FILE);
    }
    async writeSnapshot(store, expiry) {
        const data = {
            data: Object.fromEntries(store),
            expiry: Object.fromEntries(expiry),
        };
        try {
            await fs.writeFile(this.SNAPSHOT_FILE, JSON.stringify(data));
        }
        catch (error) {
            if (error.code === "ENOENT")
                return;
            throw error;
        }
    }
    async loadSnapshot() {
        try {
            const data = await fs.readFile(process.env.RENAMED_SNAPSHOT_FILE, "utf-8");
            const parsed = JSON.parse(data);
            const expiry = new Map(Object.entries(parsed.expiry));
            for (const [key, expiresAt] of expiry) {
                Store.heap.insert({ key, expiresAt: expiresAt });
            }
            return new Map(Object.entries(parsed.data));
        }
        catch (error) {
            if (error.code === "ENOENT")
                return new Map();
            throw error;
        }
    }
}
const snapshot = new Snapshot();
export default snapshot;
//# sourceMappingURL=snapshot.service.js.map
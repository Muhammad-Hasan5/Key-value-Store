import fs from "node:fs/promises";
class Snapshot {
    constructor() {
        this.SNAPSHOT_FILE = String(process.env.SNAPSHOT_FILE);
    }
    async writeSnapshot(store) {
        const data = Object.fromEntries(store);
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
            const obj = JSON.parse(data);
            return new Map(Object.entries(obj));
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
import wal from "../utils/wal.js";
import snapshot from "./snapshot.service.js";
import minHeap from "./TTL.service.js";
export class Store {
    constructor() {
        this.heap = minHeap;
        this.store = new Map();
        this.expiry = new Map();
    }
    async init() {
        try {
            const store = await snapshot.loadSnapshot();
            await wal.recovery(store);
        }
        catch (error) {
            if (error.code === "ENOENT")
                return this.store;
            throw error;
        }
    }
    set(key, value, ttl) {
        this.store?.set(key, value);
        if (ttl) {
            const expiresAt = Date.now() + ttl * 1000;
            this.expiry.set(key, expiresAt);
            this.heap.insert({ key, expiresAt });
        }
        else {
            this.expiry.delete(key);
        }
    }
    get(key) {
        const expiresAt = this.expiry.get(key);
        if (expiresAt && expiresAt < Date.now()) {
            this.remove(key);
            return undefined;
        }
        return this.store?.get(key);
    }
    remove(key) {
        this.store?.delete(key);
    }
    has(key) {
        return this.store?.has(key) ?? false;
    }
    getAll() {
        return new Map(this.store);
    }
    getExpiryMap() {
        return new Map(this.expiry);
    }
}
const store = new Store();
export default store;
//# sourceMappingURL=store.service.js.map
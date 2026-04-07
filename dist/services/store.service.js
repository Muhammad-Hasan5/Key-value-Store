import wal from "../utils/wal.js";
import snapshot from "./snapshot.service.js";
class Store {
    constructor() {
        this.store = new Map();
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
    ;
    set(key, value) {
        this.store?.set(key, value);
    }
    get(key) {
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
}
const store = new Store();
export default store;
//# sourceMappingURL=store.service.js.map
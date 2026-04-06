import { recovery } from "../utils/wal.js";
class Store {
    constructor() {
        this.store = new Map();
        async () => {
            await recovery(this.store);
        };
    }
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
        return store?.has(key) ?? false;
    }
}
const store = new Store();
export default store;
//# sourceMappingURL=store.service.js.map
class Store {
    constructor() {
        this.store = undefined;
        this.store = new Map();
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
    getStore() {
        if (!this.store) {
            throw new Error("store is not initialized");
        }
        return this.store.entries;
    }
}
const store = new Store();
export default store;
//# sourceMappingURL=store.service.js.map
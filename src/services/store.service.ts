import { recovery } from "../utils/wal.js";

class Store {
  store: Map<string, string>;

  constructor() {
    this.store = new Map();
    async () => {
      await recovery(this.store);
    }
  }

  set(key: string, value: string): void {
    this.store?.set(key, value);
  }

  get(key: string): string | undefined {
    return this.store?.get(key);
  }

  remove(key: string): void {
    this.store?.delete(key);
  }

  has(key: string): boolean{
    return store?.has(key) ?? false
  }

}

const store = new Store();

export default store;

import wal from "../utils/wal.js";
import snapshot from "./snapshot.service.js";

class Store {
  store: Map<string, string>;

  constructor() {
    this.store = new Map();
  }

  async init(){
      try {
        const store = await snapshot.loadSnapshot();
        await wal.recovery(store);
      } catch (error: any) {
        if (error.code === "ENOENT") return this.store;
        throw error;
      }
    };

  set(key: string, value: string): void {
    this.store?.set(key, value);
  }

  get(key: string): string | undefined {
    return this.store?.get(key);
  }

  remove(key: string): void {
    this.store?.delete(key);
  }

  has(key: string): boolean {
    return this.store?.has(key) ?? false;
  }

  getAll(): Map<string, string> {
    return new Map(this.store);
  }
}

const store = new Store();

export default store;

import wal from "../utils/wal.js";
import snapshot from "./snapshot.service.js";
import minHeap from "./TTL.service.js";

export class Store {
  private store: Map<string, string>;
  expiry: Map<string, number>;
  heap = minHeap


  constructor() {
    this.store = new Map();
    this.expiry = new Map();
  }

  async init() {
    try {
      const store = await snapshot.loadSnapshot();
      await wal.recovery(store);
    } catch (error: any) {
      if (error.code === "ENOENT") return this.store;
      throw error;
    }
  }

  set(key: string, value: string, ttl?: number): void {
    this.store?.set(key, value);

    if(ttl){
      const expiresAt = Date.now() + ttl * 1000
      this.expiry.set(key, expiresAt)
      this.heap.insert({key, expiresAt})
    } else {
      this.expiry.delete(key)
    }
  }

  get(key: string): string | undefined {
    const expiresAt = this.expiry.get(key)

    if(expiresAt && expiresAt < Date.now()){
      this.remove(key)
      return undefined
    }

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

  getExpiryMap(): Map<string, number> {
    return new Map(this.expiry)
  }
}

const store = new Store();

export default store;

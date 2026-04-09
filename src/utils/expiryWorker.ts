import { Store } from "../services/store.service.js";

export function expiryWorker(store: Store) {
  setInterval(() => {
    while (1) {
      const top = store.heap.peek();
      if (!top) break;
      if (top.expiresAt && top.expiresAt > Date.now()) break;
      const node = store.heap.pop();
      const realExpiry = store.expiry.get(node?.key as string);
      if (realExpiry !== node?.expiresAt) continue;
      store.remove(node?.key as string);
    }
  }, 100);
}

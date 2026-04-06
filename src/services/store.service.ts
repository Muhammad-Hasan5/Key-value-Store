class Store {
  store: Map<string, any> | undefined = undefined;

  constructor() {
    this.store = new Map();
  }

  set(key: string, value: any): void {
    this.store?.set(key, value);
  }

  get(key: string): any {
    return this.store?.get(key);
  }

  remove(key: string): void {
    this.store?.delete(key);
  }

  has(key: string): boolean{
    return store.has(key) ?? false
  }

}

const store = new Store();

export default store;

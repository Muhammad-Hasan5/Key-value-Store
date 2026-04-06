declare class Store {
    store: Map<string, string>;
    constructor();
    set(key: string, value: string): void;
    get(key: string): string | undefined;
    remove(key: string): void;
    has(key: string): boolean;
}
declare const store: Store;
export default store;
//# sourceMappingURL=store.service.d.ts.map
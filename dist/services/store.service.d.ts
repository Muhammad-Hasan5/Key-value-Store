declare class Store {
    store: Map<string, string>;
    constructor();
    init(): Promise<Map<string, string> | undefined>;
    set(key: string, value: string): void;
    get(key: string): string | undefined;
    remove(key: string): void;
    has(key: string): boolean;
    getAll(): Map<string, string>;
}
declare const store: Store;
export default store;
//# sourceMappingURL=store.service.d.ts.map
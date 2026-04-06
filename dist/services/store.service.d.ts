declare class Store {
    store: Map<string, any> | undefined;
    constructor();
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
    getStore(): any;
}
declare const store: Store;
export default store;
//# sourceMappingURL=store.service.d.ts.map
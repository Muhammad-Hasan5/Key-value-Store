export declare class Store {
    private store;
    expiry: Map<string, number>;
    heap: {
        heap: {
            key: string;
            expiresAt: number;
        }[];
        bubbleUp(): void;
        bubbleDown(): void;
        insert(node: {
            key: string;
            expiresAt: number;
        }): void;
        peek(): {
            key: string;
            expiresAt: number;
        } | undefined;
        pop(): {
            key: string;
            expiresAt: number;
        } | undefined;
    };
    constructor();
    init(): Promise<Map<string, string> | undefined>;
    set(key: string, value: string, ttl?: number): void;
    get(key: string): string | undefined;
    remove(key: string): void;
    has(key: string): boolean;
    getAll(): Map<string, string>;
    getExpiryMap(): Map<string, number>;
}
declare const store: Store;
export default store;
//# sourceMappingURL=store.service.d.ts.map
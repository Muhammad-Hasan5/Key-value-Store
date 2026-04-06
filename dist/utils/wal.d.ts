interface pair {
    method: string;
    key: string;
    value?: string;
}
export declare function appendLog(entry: pair): Promise<void>;
export declare function recovery(store: Map<string, string>): Promise<void>;
export {};
//# sourceMappingURL=wal.d.ts.map
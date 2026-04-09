interface pair {
    method: "PUT" | "DELETE";
    key: string;
    value?: string;
    expiresAt?: number | undefined;
}
declare class WAL {
    private queue;
    isFlushing: boolean;
    private paused;
    private LOG_FILE;
    private flush;
    private waitUntilResume;
    constructor();
    pause(): void;
    resume(): void;
    appendLog(entry: pair): Promise<void>;
    recovery(store: Map<string, string>): Promise<void>;
}
declare const wal: WAL;
export default wal;
//# sourceMappingURL=wal.d.ts.map
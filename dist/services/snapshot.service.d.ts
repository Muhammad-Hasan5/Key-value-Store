declare class Snapshot {
    private SNAPSHOT_FILE;
    writeSnapshot(store: Map<string, string>): Promise<void>;
    loadSnapshot(): Promise<Map<string, string>>;
}
declare const snapshot: Snapshot;
export default snapshot;
//# sourceMappingURL=snapshot.service.d.ts.map
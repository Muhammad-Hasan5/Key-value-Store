type HeadNode = {
    key: string;
    expiresAt: number;
};
declare class MinHeap {
    heap: HeadNode[];
    bubbleUp(): void;
    bubbleDown(): void;
    insert(node: HeadNode): void;
    peek(): HeadNode | undefined;
    pop(): HeadNode | undefined;
}
declare const minHeap: MinHeap;
export default minHeap;
//# sourceMappingURL=TTL.service.d.ts.map
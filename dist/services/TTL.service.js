//key-value scheduler (TTL)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    bubbleUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent]?.expiresAt <= this.heap[i]?.expiresAt)
                break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }
    bubbleDown() {
        let i = 0;
        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let smallest = i;
            if (left < this.heap.length &&
                this.heap[left]?.expiresAt < this.heap[smallest]?.expiresAt) {
                smallest = left;
            }
            if (right < this.heap.length &&
                this.heap[right]?.expiresAt < this.heap[smallest]?.expiresAt) {
                smallest = right;
            }
            if (smallest === i)
                break;
            [this.heap[smallest], this.heap[i]] = [
                this.heap[i],
                this.heap[smallest],
            ];
            i = smallest;
        }
    }
    insert(node) {
        this.heap.push(node);
        //bubbleup
        this.bubbleUp();
    }
    peek() {
        return this.heap[0];
    }
    pop() {
        if (this.heap.length === 0)
            return;
        const top = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            //bubbledown
            this.bubbleDown();
        }
        return top;
    }
}
const minHeap = new MinHeap();
export default minHeap;
//# sourceMappingURL=TTL.service.js.map
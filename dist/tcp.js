import net from "node:net";
import store from "./services/store.service.js";
import wal from "./utils/wal.js";
const tcp = net.createServer((socket) => {
    console.log("Connection Opened");
    socket.on("data", (data) => {
        const inputs = data.toString().split("\n");
        for (const input of inputs) {
            if (!input.trim())
                continue;
            const [command, key, value, ttl] = input.trim().split(" ");
            let response = "";
            if (command === "SET") {
                if (ttl !== undefined) {
                    const ttlNum = Number(ttl);
                    store.set(key, value, ttlNum);
                    wal.appendLog({
                        method: "PUT",
                        key: key,
                        value: value,
                        expiresAt: Date.now() + ttlNum * 1000,
                    });
                }
                else {
                    store.set(key, value);
                    wal.appendLog({
                        method: "PUT",
                        key: key,
                        value: value,
                    });
                }
                response = "OK\n";
            }
            else if (command === "GET") {
                const val = store.get(key);
                response = (val ?? "NULL") + "\n";
            }
            else if (command === "DEL") {
                store.remove(key);
                response = "OK\n";
            }
            else {
                response = "ERR unknown command\n";
            }
            if (socket.writable) {
                socket.write(response);
            }
        }
    });
    socket.on("end", () => {
        console.log("Connection Closed");
    });
    socket.on("error", (err) => {
        console.error("Socket error:", err.message);
    });
});
export default tcp;
//# sourceMappingURL=tcp.js.map
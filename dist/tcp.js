import net from "node:net";
import store from "./services/store.service.js";
import wal from "./utils/wal.js";
const tcp = net.createServer((socket) => {
    console.log("Connection Opened");
    socket.on("data", (data) => {
        const input = data.toString().trim();
        const [command, key, value, ttl] = input.split(" ");
        //SET + ttl
        if (command === "SET") {
            if (ttl) {
                store.set(key, value, Number(ttl));
                wal.appendLog({
                    method: "PUT",
                    key: key,
                    value: value,
                    expiresAt: Number(ttl),
                });
            }
            else {
                store.set(key, value, Number(ttl));
                wal.appendLog({
                    method: "PUT",
                    key: key,
                    value: value,
                    expiresAt: undefined,
                });
            }
            socket.write("OK\n");
        }
        //GET
        else if (command === "GET") {
            const val = store.get(key);
            socket.write((val ?? "NULL") + "\n");
        }
        //DEL
        else if (command === "DEL") {
            store.remove(key);
            socket.write("OK\n");
        }
        //unknown command
        else {
            socket.write("ERR unknown command\n");
        }
    });
    socket.end("end", () => {
        console.log("Connection Closed");
    });
});
export default tcp;
//# sourceMappingURL=tcp.js.map
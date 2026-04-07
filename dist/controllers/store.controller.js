import store from "../services/store.service.js";
import wal from "../utils/wal.js";
export async function set(req, res) {
    try {
        const { key, value } = req.body || {};
        if (key === undefined || value === undefined) {
            return res
                .status(400)
                .json({
                status: 400,
                message: "key string and its value are required",
            });
        }
        if (key === "" || value === "") {
            return res
                .status(400)
                .json({ status: 400, message: "key and value string cannot be empty" });
        }
        store.set(key, value);
        wal.appendLog({ method: "PUT", key, value });
        return res.status(201).json({
            status: 201,
            message: "key and value stored successfully",
        });
    }
    catch (error) {
        if (error.code === "ENOENT")
            return;
        throw error;
    }
}
export async function get(req, res) {
    const key = req.params.key;
    if (key === undefined) {
        return res.status(400).json({ status: 400, message: "key is required" });
    }
    if (key === "") {
        return res
            .status(400)
            .json({ status: 400, message: "key cannot be empty" });
    }
    const value = store.get(key);
    if (value === undefined) {
        return res
            .status(404)
            .json({ status: 404, message: "key not found", data: null });
    }
    res.status(200).json({
        status: 200,
        message: "key fetched successfullt",
        data: value,
    });
}
export async function remove(req, res) {
    try {
        const key = req.params.key;
        if (!key) {
            return res.status(400).json({ status: 400, message: "key is required" });
        }
        if (key === "") {
            return res
                .status(400)
                .json({ status: 400, message: "key cannot be empty" });
        }
        if (!store.has(key)) {
            return res.status(404).json({ status: 404, message: "key not found" });
        }
        store.remove(key);
        wal.appendLog({ method: "DELETE", key });
        res.status(200).json({
            status: 200,
            message: "key removed successfully",
            data: null,
        });
    }
    catch (error) {
        if (error.code === "ENOENT")
            return;
        throw error;
    }
}
//# sourceMappingURL=store.controller.js.map
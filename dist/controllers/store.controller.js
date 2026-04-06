import store from "../services/store.service.js";
export async function set(req, res) {
    const { key, value } = req.body;
    if (!key || !value) {
        throw new Error("key string and its value are required");
    }
    if (key == "") {
        throw new Error("key string cannot be empty");
    }
    store.set(key, value);
    res.status(201).json({
        status: 201,
        message: "key and value stored successfully",
    });
}
export async function get(req, res) {
    const { key } = req.body;
    if (!key) {
        throw new Error("key string and its value are required");
    }
    if (key == "") {
        throw new Error("key string cannot be empty");
    }
    const value = store.get(key);
    res.status(200).json({
        status: 200,
        message: "key fetched successfullt",
        data: value,
    });
}
export async function remove(req, res) {
    const { key } = req.body;
    if (!key) {
        throw new Error("key string and its value are required");
    }
    if (key == "") {
        throw new Error("key string cannot be empty");
    }
    const value = store.remove(key);
    res.status(200).json({
        status: 200,
        message: "key removed successfullt",
        data: null,
    });
}
export async function getStore(req, res) {
    const kvStore = store.getStore();
    if (!kvStore) {
        throw new Error("store is empty or no initialized");
    }
    res.status(200).json({
        status: 200,
        message: "key fetched successfullt",
        data: kvStore,
    });
}
//# sourceMappingURL=store.controller.js.map
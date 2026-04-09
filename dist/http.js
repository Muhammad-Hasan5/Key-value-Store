import express from "express";
import router from "./routes/store.route.js";
const http = express();
http.use(express.json({ limit: "5mb" }));
http.use(express.urlencoded({ limit: "5mb", extended: true }));
http.use("/", router);
http.get("/", (req, res) => {
    res.send("Hello World!");
});
export default http;
//# sourceMappingURL=http.js.map
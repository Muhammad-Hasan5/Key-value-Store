import express from "express";
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
export default app;
//# sourceMappingURL=app.js.map
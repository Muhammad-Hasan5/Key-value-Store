import { Router } from "express";
import { set, get, remove } from "../controllers/store.controller.js";
const router = Router();
router.route("/store").put(set);
router.route("/store/:key").get(get).delete(remove);
export default router;
//# sourceMappingURL=store.route.js.map
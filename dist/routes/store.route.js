import { Router } from "express";
import { set, get, getStore, remove } from "../controllers/store.controller.js";
const router = Router();
router.route("/store").put(set).get(get).delete(remove);
router.route("/get-store").get(getStore);
export default router;
//# sourceMappingURL=store.route.js.map
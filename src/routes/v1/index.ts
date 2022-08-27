import { Router } from "express";
import userRouters from "./users.routes";
import groupRouters from "./groups.routes"

const router = Router();

router.use("/users", userRouters);
router.use("/groups", groupRouters);

export default router;

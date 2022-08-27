import { Router } from "express";
import GroupController from "@controllers/group.controller";
import validate from "@middlewares/validate";
import { createGroupSchema } from "@schemas/index";

const userRouter = Router();
const groupController = new GroupController();

userRouter.get("/", groupController.get);
userRouter.post("/", validate(createGroupSchema), groupController.post);
userRouter.get("/:id", groupController.getById);
userRouter.put("/:id", groupController.updateOne);
userRouter.delete("/:id", groupController.delete);

export default userRouter;

import { Router } from "express";
import UserController from "@controllers/user.controller";
import validate from "@middlewares/validate";
import { createUserSchema, groupAddUser } from "@schemas/index";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.get);
userRouter.post("/", validate(createUserSchema), userController.post);
userRouter.get("/:id", userController.getById);

userRouter.get("/:id/groups", userController.getUserGroups);
userRouter.patch(
  "/:userId",
  validate(groupAddUser),
  userController.addUserToGroup
);
userRouter.put("/:id", userController.updateOne);
userRouter.delete("/:id", userController.delete);

export default userRouter;

import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import UserService from "../services/user.service";
import BaseController from "./base.controller";
import GroupService from "../services/group.service";
import { userGroupInput, groupAddUserInput } from "@schemas/group.schema";
@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: UserService) {
    super(service!);
  }

  getUserGroups = async (
    req: Request<userGroupInput["params"]>,
    res: Response
  ) => {
    try {
      let group = new GroupService();
      let userGroups = await group.get({ owner: req.params.id });

      res.status(200).json(userGroups);
    } catch (e) {
      return res.status(500).send({ message: "server error" });
    }
  };
  addUserToGroup = async (
    req: Request<groupAddUserInput["params"], {}, groupAddUserInput["body"]>,
    res: Response
  ) => {
    try {
      let userId = req.params.userId;

      await this.service.findOneAndUpdate(
        { id: userId },
        { $push: { groups: req.body.group } }
      );
    } catch (e) {
      return res.status(500).send({ message: "server error" });
    }
  };

  // deleteUser = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   try {
  //     // const resource = await this.service.delete(id);
  //     const
  //     res.send(resource);
  //   } catch (error: any) {
  //     return res.status(500).send({ message: "server error" });
  //   }
  // };
}

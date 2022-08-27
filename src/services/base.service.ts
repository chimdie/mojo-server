import { autoInjectable } from "tsyringe";
import mongoose from "mongoose";
import ModelI from "@interfaces/model.interface";

export default class BaseService<T> {
  model: mongoose.Model<any, any>;
  constructor(model: ModelI) {
    this.model = model.model;
  }

  post = async (data: T) => {
    try {
      const resourse = await this.model.create(data);
      return resourse;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  get = async (filters = {}): Promise<T[]> => {
    const resource = (await this.model.find(filters)) as T[];
    return resource;
  };

  getById = async (id: string): Promise<T> => {
    const resource = (await this.model.findOne({
      id: mongoose.Types.ObjectId(id),
    })) as T;
    return resource;
  };

  findOneAndUpdate = async (
    query = {},
    update = {},
    options = {}
  ): Promise<T[]> => {
    const resource = (await this.model.findOneAndUpdate(
      query,
      update,
      options
    )) as T[];
    return resource;
  };

  updateOne = async (query = {}, update = {}, options = {}): Promise<T[]> => {
    const resource = (await this.model.updateOne(
      query,
      update,
      options
    )) as T[];
    return resource;
  };

  delete = (id: string): void => {
    return this.model.remove({ id: mongoose.Types.ObjectId(id) });
  };
}

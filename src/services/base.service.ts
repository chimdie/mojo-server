import mongoose, { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import ModelI from '@interfaces/model.interface';

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

  // loggingIdentity<T extends Lengthwise>(arg: T): T {};

  async get<T>(filters?: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    const resource = (await this.model.find(filters!, options)) as T[];
    return resource;
  }

  async getOne<I>(filters: FilterQuery<I>, options?: QueryOptions): Promise<I> {
    const resource = (await this.model.findOne(filters, options)) as I;
    return resource;
  }

  getById = async (id: string, options?: QueryOptions): Promise<T> => {
    const resource = (await this.model.findOne(
      {
        id: mongoose.Types.ObjectId(id),
      },
      options
    )) as T;
    return resource;
  };

  findOneAndUpdate = async (query = {}, update = {}, options?: QueryOptions): Promise<T[]> => {
    const resource = (await this.model.findOneAndUpdate(query, update, options!)) as T[];
    return resource;
  };

  updateOne = async (query = {}, update = {}, options: QueryOptions): Promise<T[]> => {
    const resource = (await this.model.updateOne(query, update, options)) as T[];
    return resource;
  };

  delete = (id: string): void => {
    return this.model.remove({ id: mongoose.Types.ObjectId(id) });
  };
  async addToCollection<I>(id: string, input: object, options?: QueryOptions): Promise<I[]> {
    return (await this.model.findByIdAndUpdate(
      id,
      {
        $push: { ...input },
      },
      options
    )) as I[];
  }
}

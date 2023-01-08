import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import BaseService from '../services/base.service';

@injectable()
export default class BaseController {
  service: BaseService<any>;

  constructor(service: BaseService<any>) {
    this.service = service;
  }

  post = async (req: Request, res: Response) => {
    try {
      const resource = await this.service.post(req.body);

      return res.send(resource);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log({ error });
      throw new Error(error);
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const resource = await this.service.get();
      return res.send(resource);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const resource = await this.service.getById(id);
      if (resource === null) {
        return res.status(400).send({ message: 'No data found' });
      }
      return res.send(resource);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  };

  findOneAndUpdate = async (req: Request, res: Response) => {
    const query = { ...req.params, ...req.query };
    if (query.id) {
      query._id = query.id;
      delete query.id;
    }
    try {
      const resource = await this.service.findOneAndUpdate(query, req.body, {
        lean: true,
        new: true,
      });
      return res.send(resource);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  };

  updateOne = async (req: Request, res: Response) => {
    const query = { ...req.params, ...req.query };
    if (query.id) {
      query._id = query.id;
      delete query.id;
    }
    try {
      const resource = await this.service.updateOne(
        query,
        {
          $set: req.body,
        },
        { lean: true }
      );
      return res.send(resource);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const resource = await this.service.delete(id);
      return res.send(resource);
    } catch (error: any) {
      return res.status(500).send({ message: 'server error' });
    }
  };
}

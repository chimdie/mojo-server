import { Router } from 'express';
import banks from '@utils/data';

const bankRouter = Router();

bankRouter.get('/get-all-banks', (req: any, res: any) => {
  res.status(201).json(banks);
});
export default bankRouter;

import { Router } from 'express';
import mongoose from 'mongoose';
import bankRouter from './banks.routes';
import groupRouters from './groups.routes';
import userRouters from './users.routes';

const router = Router();

router.use('/users', userRouters);
router.use('/groups', groupRouters);
router.use('/banks', bankRouter);
router.use('/db/drop', (req, res) => {
  mongoose.connection.db.dropDatabase();
  res.send('database dropped');
});
export default router;

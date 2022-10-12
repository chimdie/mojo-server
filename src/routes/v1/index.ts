import { Router } from 'express';
import groupRouters from './groups.routes';
import userRouters from './users.routes';

const router = Router();

router.use('/users', userRouters);
router.use('/groups', groupRouters);

export default router;

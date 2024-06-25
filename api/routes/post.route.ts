import { Router } from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create } from '../controllers/post.controller';

const router = Router();

router.post('/create', verifyToken, create);

export default router;

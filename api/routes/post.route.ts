import { Router } from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create, getPosts } from '../controllers/post.controller';

const router = Router();

router.post('/create', verifyToken, create);
router.get('/get-posts', getPosts);

export default router;

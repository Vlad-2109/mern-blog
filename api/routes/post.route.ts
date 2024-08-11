import { Router } from 'express';
import { verifyToken } from '../utils/verifyUser';
import { create, deletePost, getPosts } from '../controllers/post.controller';

const router = Router();

router.post('/create', verifyToken, create);
router.get('/get-posts', getPosts);
router.delete('/delete-post/:postId/:userId', verifyToken, deletePost);

export default router;

import { Router } from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createComment, getPostComments } from '../controllers/comment.controller';

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/get-post-comments/:postId', getPostComments);

export default router;

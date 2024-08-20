import { Router } from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createComment, editComment, getPostComments, likeComment } from '../controllers/comment.controller';

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/get-post-comments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);

export default router;

import { Router } from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createComment, deleteComment, editComment, getPostComments, likeComment } from '../controllers/comment.controller';

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/get-post-comments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

export default router;

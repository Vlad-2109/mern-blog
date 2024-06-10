import { Router } from 'express';
import { deleteUser, signout, test, updateUser } from '../controllers/user.controller';
import { verifyToken } from '../utils/verifyUser';

const router = Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router;

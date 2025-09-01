import express from 'express';
import { getUserProfile, updateUserProfile, changeUserPassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all user routes with JWT middleware
router.use(authMiddleware);

// GET /api/user/profile
router.get('/profile', getUserProfile);

// PUT /api/user/profile
router.put('/profile', updateUserProfile);

// PUT /api/user/change-password
router.put('/change-password', changeUserPassword);

export default router;

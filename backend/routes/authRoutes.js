import express from 'express';
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;

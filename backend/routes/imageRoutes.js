import express from 'express';
import multer from 'multer';
import { compressImage, getImageHistory } from '../controllers/imageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Protect all image routes
router.use(authMiddleware);

router.post('/compress', upload.single('image'), compressImage);
router.get('/history', getImageHistory);

export default router;

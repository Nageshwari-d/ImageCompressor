import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import config from './config/env.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js'; // Add image routes import

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));

    app.use(express.json({ limit: '10mb' }));

    app.use('/uploads', express.static('uploads')); // serve uploads statically

    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/images', imageRoutes); // Mount image routes here

    app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' });
    });

    app.use((err, req, res, next) => {
      console.error('Unhandled error:', err);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    });

    const PORT = config.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect DB, server not started', error);
    process.exit(1);
  }
};

startServer();

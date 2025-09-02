import sharp from 'sharp';
import ImageData from "../models/imagedata.js";

import path from 'path';
import fs from 'fs';

async function compressWithMaxSize(buffer, quality, maxSize, minQuality = 10) {
  let currQuality = quality;
  let compressedBuffer;

  while (currQuality >= minQuality) {
    compressedBuffer = await sharp(buffer).jpeg({ quality: currQuality }).toBuffer();
    if (!maxSize || compressedBuffer.length <= maxSize) {
      return compressedBuffer;
    }
    currQuality -= 1;  // finer decrement for better size accuracy
  }
  return compressedBuffer;
}

export async function compressImage(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image file is required.' });

    const quality = parseInt(req.body.quality) || 80;
    const maxSize = parseInt(req.body.maxSize) || null;

    const compressedBuffer = await compressWithMaxSize(req.file.buffer, quality, maxSize);

    const compressedFilename = `compressed-${Date.now()}.jpg`;
    const outputPath = path.join('uploads', compressedFilename);

    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }

    fs.writeFileSync(outputPath, compressedBuffer);

    const imageRecord = new ImageData({
      user: req.user.userId,
      originalName: req.file.originalname,
      compressedSize: compressedBuffer.length,
      quality,
    });

    await imageRecord.save();

    res.json({ message: 'Image compressed successfully.', filename: compressedFilename, size: compressedBuffer.length });

  } catch (error) {
    res.status(500).json({ message: 'Compression failed', error: error.message });
  }
}

export async function getImageHistory(req, res) {
  try {
    const images = await ImageData.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch image history', error: error.message });
  }
}

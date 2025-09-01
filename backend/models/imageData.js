import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalName: { type: String, required: true },
  compressedSize: { type: Number, required: true },
  quality: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ImageData', imageSchema);

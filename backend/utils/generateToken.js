import jwt from 'jsonwebtoken';
import config from '../config/env.js';

function generateToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

export default generateToken;

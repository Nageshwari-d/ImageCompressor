import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/env.js';
import sendEmail from '../utils/sendEmail.js';

// Registration controller
export async function registerUser(req, res) {
  const { username, phone, email, password } = req.body;

  if (!username || !phone || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  const phoneRegex = /^(?:\+91|91)?[789]\d{9}$/;
  if (!phoneRegex.test(phone))
    return res.status(400).json({ message: 'Invalid Indian phone number.' });

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered.' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, phone, email: email.toLowerCase(), passwordHash });
    await newUser.save();

    res.status(201).json({ _id: newUser._id, email: newUser.email, message: 'Registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

// Login controller
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ message: 'User does not exist. Please register first.' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect password.' });

    const token = jwt.sign({ userId: user._id, email: user.email }, config.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

// Request password reset controller
export async function requestPasswordReset(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: 'User not found.' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    const resetUrl = `https://yourfrontend.com/reset-password/${resetToken}`;

    await sendEmail(user.email, 'Password Reset Request', `Please reset your password by clicking the link: ${resetUrl}`);

    res.json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('requestPasswordReset error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

// Reset password controller
export async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token.' });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('resetPassword error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

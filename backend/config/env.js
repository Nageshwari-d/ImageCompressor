import dotenv from 'dotenv';
dotenv.config();
const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ImageCompressor',
  JWT_SECRET: process.env.JWT_SECRET || '0f3ad4dfc419958d298fd1a0fa86acf2861372468c4dd6a933b4bdc8651fe68930f32a0ce3c9e845383e3692a88e2fefee903500cfd1a0e8e70d8f4decba4119',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',       // Add EMAIL_HOST here
  EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,             // Add EMAIL_PORT and convert to number
  EMAIL_SECURE: process.env.EMAIL_SECURE === 'true',             // Convert to boolean
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  APP_NAME: process.env.APP_NAME || 'ImageMaster',               // Optionally add APP_NAME
};

export default config;

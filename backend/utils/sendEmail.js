import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Your SMTP provider
  port: 587,
  auth: {
    user: 'your-email@example.com',
    pass: 'email-password',
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'no-reply@example.com',
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;

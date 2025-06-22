// utils/mailer.js
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  secure:true,
  auth: {
    user: process.env.MAIL_USER ,   // replace with your email
    pass: process.env.MAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"My Shop" <arsh302@gmail.com>',
    to,
    subject,
    text,
  });
};

export default sendEmail;

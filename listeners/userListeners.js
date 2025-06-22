
import sendEmail from "../utils/mailer.js"
import userEvents from "../events/userEvents.js"

userEvents.on('userRegistered', async (user) => {
    const verifyUrl = `http://localhost:3000/verify-email?token=${user.verificationToken}`;
    const html = `<p>Hello ${user.name},</p><p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">Verify Email</a>`;
  try {
    
    //await sendEmail(user.email, 'Welcome to Our Store!', `Hi ${user.name}, thanks for registering!`);
     await sendEmail(user.email, 'Verify your email', html);
    console.log(`Verification email sent to ${user.email}`);
  } catch (err) {
     console.error('Error sending verification email:', err.message);
  }
});

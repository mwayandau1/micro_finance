const nodemailer = require("nodemailer");

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
};

const sendEmail = async ({ to, subject, html }) => {
  /**
   * creating a nodemailer transport
   */
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return await transporter.sendMail({
    from: '"Micro-Own" <microfocusin@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

const sendEmailVerification = async ({ email, verificationToken }) => {
  /**
   * Send email verification token to user
   * @param:email, and verificationToken
   * return:Send an email to user
   */
  const verifyEmail = `http://localhost:5000/auth/verify-email/${verificationToken}/${email}`;

  const message = `<p>Please confirm your email by clicking on the following link :
      <a href="${verifyEmail}">Verify Email</a> </p>`;

  return await sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${email}</h4>
        ${message}
        `,
  });
};

module.exports = { sendEmailVerification };

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
  try {
    /**
     * creating a nodemailer transport
     */
    const transporter = nodemailer.createTransport(nodemailerConfig);

    // Validate recipient email
    if (!to) {
      throw new Error("Recipient email (to) is not defined");
    }

    return await transporter.sendMail({
      from: '"Micro-Own" <microfocusin@gmail.com>', // sender address
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendEmailVerification = async ({
  email,
  verificationToken,
  firstName,
}) => {
  try {
    /**
     * Send email verification token to user
     * @param: email, and verificationToken
     * return: Send an email to user
     */
    console.log("Sending verification email to:", email);
    console.log("Verification token:", verificationToken);

    if (!email) {
      throw new Error("Email is not defined");
    }

    const verifyEmail = `http://localhost:5000/auth/verify-email/${verificationToken}/${email}`;

    const message = `<p>Please confirm your email by clicking on the following link:
        <a href="${verifyEmail}">Verify Email</a> </p>`;

    return await sendEmail({
      to: email,
      subject: "Email Confirmation",
      html: `<h4>Hello, ${firstName}</h4>
          ${message}
          `,
    });
  } catch (error) {
    console.error("Error in sendEmailVerification:", error);
    throw error; // Re-throw the error after logging
  }
};

const sendResetPasswordEmail = async ({ email, token, firstName }) => {
  /**
   * Sends password reset link to user
   * @param:email, token, and firstName
   * @return:sends email to user
   */
  try {
    const resetURL = `http://localhost:5000/auth/reset-password/${token}/${email}`;
    const message = `<p>Please reset your password by clicking on the following link:
      <a href="${resetURL}">Reset Password</a></p>`;

    return await sendEmail({
      to: email,
      subject: "Reset Password",
      html: `<h4>Hello, ${firstName}</h4>
        ${message}
      `,
    });
  } catch (error) {
    console.error("Error in sendResetPasswordEmail:", error);
    throw error;
  }
};

module.exports = { sendEmailVerification, sendResetPasswordEmail };

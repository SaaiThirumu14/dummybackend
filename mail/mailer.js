const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensures newlines are respected
  SCOPES
);

const sendMail = async (members, college, eventName) => {
  try {
    // Authorize and get access token
    const tokens = await jwtClient.authorize();
    const accessToken = tokens.access_token;

    // Configure the transporter using the access token
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_SENDER,
        accessToken,
        clientId: "",     // Not required for service account
        clientSecret: "", // Not required for service account
        refreshToken: "", // Not required for service account
      },
    });

    // Send email to each team member
    for (const member of members) {
      const mailOptions = {
        from: process.env.GMAIL_SENDER,
        to: member.email,
        subject: `Confirmation of Registration – ${eventName}`,
        html: `
          <p>Dear ${member.name},</p>
          <p>We are pleased to confirm your registration for the event <strong>${eventName}</strong>, representing <strong>${college}</strong>.</p>
          <p>Thank you for your interest and enthusiasm. We look forward to your active participation and are confident you'll have an engaging and enriching experience.</p>
          <p>Should you have any questions or require further information, please don’t hesitate to reach out to us.</p>
          <p>Best regards,<br><strong>Team Kranti</strong></p>
        `,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${member.email}: ${info.response}`);
      } catch (err) {
        console.error(`❌ Error sending mail to ${member.email}`, err);
      }
    }
  } catch (error) {
    console.error("❌ Failed to send emails:", error);
  }
};

module.exports = sendMail;

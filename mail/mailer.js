const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const fs = require("fs");

// Load service account credentials from Render secret file
const serviceAccount = JSON.parse(
  fs.readFileSync("/etc/secrets/GOOGLE_SERVICE_ACCOUNT", "utf8")
);

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  SCOPES
);

const sendMail = async (members, college, eventName) => {
  try {
    const tokens = await jwtClient.authorize();
    const accessToken = tokens.access_token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_SENDER, // Keep this in .env
        accessToken,
        clientId: serviceAccount.client_id,
        clientSecret: "", // Not required when using JWT for service account
        refreshToken: null,
      },
    });

    members.forEach((member) => {
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

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`❌ Error sending mail to ${member.email}`, err);
        } else {
          console.log(`✅ Email sent to ${member.email}: ${info.response}`);
        }
      });
    });
  } catch (error) {
    console.error("❌ Failed to send emails:", error);
  }
};

module.exports = sendMail;

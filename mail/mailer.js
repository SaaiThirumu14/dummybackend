const nodemailer = require("nodemailer");

const sendMail = async (members, college, eventName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SENDER,
        pass: process.env.APP_KEY, // from App Password
      },
    });

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

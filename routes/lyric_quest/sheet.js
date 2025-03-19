const { google } = require("googleapis");
const keys = require("../../synposium-373a1c643231.json"); // Your service account key

const SHEET_ID = "1I5wGkikf1yrPo8X1u6QR3WFjT_kyB8P-MZQhH-BcEAY";
const SHEET_NAME = "Lyric_quest"; // Tab name in Google Sheet

const insertIntoSheet = async (data) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const values = [
      [
        new Date().toLocaleString(),
        data.teamName,
        data.collegeName,
        data.year,
        data.event,
        data.member1.name,
        data.member1.phone,
        data.member1.email,
        data.member2.name,
        data.member2.phone,
        data.member2.email,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`, // Assumes headers are in row 1
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values,
      },
    });

    console.log("✅ Data added to Google Sheet: Lyric Quest");
  } catch (error) {
    console.error("❌ Failed to write to Google Sheet:", error.message);
  }
};

module.exports = insertIntoSheet;

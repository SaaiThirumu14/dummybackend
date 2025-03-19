const { google } = require("googleapis");
const creds = require("../../synposium-373a1c643231.json"); // Path to your service account key

const SHEET_ID = "1I5wGkikf1yrPo8X1u6QR3WFjT_kyB8P-MZQhH-BcEAY"; // Google Sheet ID
const SHEET_NAME = "Timelesstruth"; // Sheet tab name

const insertIntoSheet = async (data) => {
  try {
    // Auth
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Format row data
    const row = [
      new Date().toLocaleString(),
      data.teamName,
      data.collegeName,
      data.year,
      data.event,
      data.member1?.name || "",
      data.member1?.phone || "",
      data.member1?.email || "",
      data.member2?.name || "",
      data.member2?.phone || "",
      data.member2?.email || "",
      data.member3?.name || "",
      data.member3?.phone || "",
      data.member3?.email || "",
      data.member4?.name || "",
      data.member4?.phone || "",
      data.member4?.email || "",
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2`, // Start cell, will auto-insert below last row
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    console.log("✅ Data added to Google Sheet for Timeless Truths");
  } catch (error) {
    console.error("❌ Google Sheets API Error:", error.message);
  }
};

module.exports = insertIntoSheet;

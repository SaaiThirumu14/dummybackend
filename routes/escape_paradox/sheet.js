const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const creds = require("../../synposium-373a1c643231.json");

const SHEET_ID = "1I5wGkikf1yrPo8X1u6QR3WFjT_kyB8P-MZQhH-BcEAY";

const insertIntoSheet = async (data) => {
  const auth = new GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
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
      data.member2.name || "",
      data.member2.phone || "",
      data.member2.email || "",
    ],
  ];

  const resource = {
    values,
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `Escape-paradox!A2`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource,
  });
};

module.exports = insertIntoSheet;

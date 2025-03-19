const { google } = require('googleapis');
const credentials = require('../../synposium-373a1c643231.json'); // Your service account key file

const SHEET_ID = '1I5wGkikf1yrPo8X1u6QR3WFjT_kyB8P-MZQhH-BcEAY';
const SHEET_NAME = 'Cyber-heist';

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const insertIntoSheet = async (data) => {
  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const values = [[
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
  ]];

  const resource = {
    values,
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `CyberHeist!A1`, // Adjust as needed
      valueInputOption: 'USER_ENTERED',
      resource,
    });

    console.log('✅ Data added to Google Sheet');
  } catch (err) {
    console.error('❌ Error appending data to Google Sheet:', err);
    throw err;
  }
};

module.exports = insertIntoSheet;

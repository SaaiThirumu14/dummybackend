const express = require("express");
const router = express.Router();
const db = require("../../config/dbconnection"); // Firestore config
const cyberHeistRegister = require("./dbstore");

// POST: Register a team
router.post("/", (req, res) => {
  cyberHeistRegister(req.body, res);
});

// GET: Count registered teams
router.get("/count", async (req, res) => {
  try {
    const snapshot = await db.collection("cyber_heist").get();
    res.json({ count: snapshot.size });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const register = require("./dbstore");
const db = require("../../config/dbconnection"); // ✅ Firebase config

// POST - Register team
router.post("/", (req, res) => {
  register(req.body, res);
});

// GET - Count registered teams
router.get("/count", async (req, res) => {
  try {
    const snapshot = await db.collection("escape_paradox").get();
    res.json({ count: snapshot.size });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

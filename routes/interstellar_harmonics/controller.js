const express = require("express");
const router = express.Router();
const db = require("../../config/dbconnection"); // Firestore DB
const register = require("./dbstore");

// Handle registration
router.post("/", (req, res) => {
  register(req.body, res);
});

// GET team count using Firestore
router.get("/count", async (req, res) => {
  try {
    const snapshot = await db.collection("interstellar_harmonics").get();
    res.json({ count: snapshot.size });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

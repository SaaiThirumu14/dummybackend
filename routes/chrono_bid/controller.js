const express = require("express");
const router = express.Router();
const db = require("../../config/dbconnection"); // 🔁 Firestore connection
const register = require("./dbstore"); // ✅ Your converted register logic

// POST: Register a team
router.post("/", (req, res) => {
  register(req.body, res);
});

// GET: Count current teams in chrono_bid
router.get("/count", async (req, res) => {
  try {
    const snapshot = await db.collection("chrono_bid").get();
    return snapshot.size // snapshot.size gives the count
  } catch (err) {
    console.error("Error fetching count:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

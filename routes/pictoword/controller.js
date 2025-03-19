const express = require("express");
const router = express.Router();
const register = require("./dbstore");
const db = require("../../config/dbconnection");

router.post("/", (req, res) => {
  register(req.body, res);
});

router.get("/count", async (req, res) => {
  try {
    const snapshot = await db.collection("pictoword").get();
    res.json({ count: snapshot.size });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

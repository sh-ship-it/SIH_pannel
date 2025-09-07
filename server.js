import express from "express";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ✅ Serve everything in the frontend folder (CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Middleware
app.use(express.json());

// ✅ Serve index.html on /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Track visitor IPs
app.post("/track", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    await pool.query("INSERT INTO visitors(ip) VALUES($1)", [ip]);
    res.json({ message: "IP stored successfully", ip });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Error storing IP" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

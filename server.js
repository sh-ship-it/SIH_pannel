import express from "express";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve all static files (HTML, CSS, JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// Track visitor IP
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

// ✅ Default route -> always serve index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

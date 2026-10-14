
require("dotenv").config();

const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json({ limit: "10kb" }));

const PORT = process.env.PORT || 3000;
const DEVICE_TOKEN = process.env.DEVICE_TOKEN;

if (!DEVICE_TOKEN) {
  throw new Error("DEVICE_TOKEN missing in .env");
}

function authenticateDevice(req, res, next) {
  const auth = req.get("Authorization") || "";
  const [scheme, token, ...extra] = auth.split(" ");

  if (scheme !== "Bearer" || !token || extra.length > 0) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  const a = Buffer.from(token);
  const b = Buffer.from(DEVICE_TOKEN);

  const valid =
    a.length === b.length &&
    crypto.timingSafeEqual(a, b);

  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

  next();
}

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Gloog API is running"
  });
});

app.post("/api/vitals", authenticateDevice, (req, res) => {
  const { heartRate } = req.body;

  if (
    typeof heartRate !== "number" ||
    !Number.isFinite(heartRate) ||
    heartRate < 1 ||
    heartRate > 300
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid heartRate"
    });
  }

  res.status(201).json({
    success: true,
    message: "Vitals received"
  });
});

app.listen(PORT, () => {
  console.log(`Gloog API running on port ${PORT}`);
});

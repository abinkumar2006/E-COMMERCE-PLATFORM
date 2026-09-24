import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import auth from "./routes/auth.js";
import users from "./routes/users.js";
import products from "./routes/products.js";
import cart from "./routes/cart.js";
import orders from "./routes/orders.js";
import admin from "./routes/admin.js";
import catalog from "./routes/catalog.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Security middleware
app.use(helmet());

// CORS
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((x) => x.trim())
  : ["*"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "1mb" }));

// Logging
app.use(morgan("dev"));

// Rate limiting for authentication routes
app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/orders", orders);
app.use("/api/admin", admin);
app.use("/api/catalog", catalog);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || "Server error",
  });
});

// Start server
async function start() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error("MONGODB_URI and JWT_SECRET are required");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on ${PORT}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
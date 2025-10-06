import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import communityRouter from "./routes/communities.route.js";
import authRouter from "./routes/auth.route.js";

// Load .env file
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/communities", communityRouter);
app.use("/auth", authRouter);

// MongoDB connection
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default app;

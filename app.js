import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Add this
import communityRouter from "./routes/communities.route.js";
import authRouter from "./routes/auth.route.js";

// Load .env file
dotenv.config();

console.log("PORT:", process.env.PORT);
console.log("DB_URI:", process.env.DB_URI ? "Loaded ✅" : "Missing ❌");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "*", // or ["http://localhost:3000", "https://your-frontend-domain.com"]
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/communities", communityRouter);
app.use("/auth", authRouter);

// MongoDB connection
if (!DB_URI) {
  console.error("❌ DB_URI is missing! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default app;

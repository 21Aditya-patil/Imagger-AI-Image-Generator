import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import generateRoute from "./routes/generate.js";
import userRoute from "./routes/userRoute.js";
import imageRoute from "./routes/imageRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_DB || process.env.MONGO_URI;
const allowedOrigins = [
  "http://localhost:5173",
  "https://imagger-ai-image-generator.vercel.app",
  ...(process.env.CLIENT_URLS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


//Routes
app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.use("/api/generate", generateRoute);
app.use("/api/auth", userRoute);
app.use("/api/image", imageRoute);


// DATABASE Connection
if (!MONGO_URI) {
  console.error("Missing MongoDB connection string. Set MONGO_DB or MONGO_URI.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET. Authentication cannot issue or verify tokens.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

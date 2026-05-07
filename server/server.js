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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://imagger-ai-image-generator.vercel.app"
  ],
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
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

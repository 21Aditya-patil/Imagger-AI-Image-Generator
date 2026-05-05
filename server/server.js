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

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


//Routes
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

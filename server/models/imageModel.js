import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
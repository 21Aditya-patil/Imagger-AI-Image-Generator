import { generateFromAI } from "../services/aiService.js";
import imageModel from "../models/imageModel.js";

export const generateImage = async (req, res) => {
  try {
    const { prompt, style } = req.body;
    const validStyles = ["anime", "3D", "pixar", "realistic"];

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    if (!style || !validStyles.includes(style)) {
      return res.status(400).json({ error: "Valid style required: anime, 3D, pixar, or realistic" });
    }

    // generate image
    const imageUrl = await generateFromAI(prompt, style);

    //SAVE TO DATABASE (IMPORTANT)
    const savedImage = await imageModel.create({
      prompt,
      style,
      imageUrl,
      user: req.user   //  from protect middleware
    });

    // return saved image
    res.status(200).json({ image: imageUrl });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
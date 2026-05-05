import imageModel from "../models/imageModel.js";
import cloudinary from "../services/cloudinaryService.js";

export const saveImage = async (req, res) => {
  try {
    const { imageUrl, prompt, style } = req.body;

    if (!imageUrl || !prompt) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    let finalImageUrl = imageUrl;
    
    // Upload to Cloudinary (both base64 and regular URLs)
    try {
      const upload = await cloudinary.uploader.upload(imageUrl, {
        folder: `Imagger/users/${req.user}`,
        resource_type: "auto",
      });
      finalImageUrl = upload.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload failed:", uploadError.message);
      return res.status(500).json({ message: "Failed to upload image to Cloudinary: " + uploadError.message });
    }

    const newImage = await imageModel.create({
      user: req.user,
      imageUrl: finalImageUrl,
      prompt,
      style,
    });

    res.status(200).json(newImage);
  } catch (error) {
    console.error("Save image error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await imageModel
      .find({ user: req.user })
      .sort({ createdAt: -1 });

    res.status(200).json({images});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await imageModel.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Verify ownership
    if (image.user.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this image" });
    }

    // Delete from Cloudinary
    try {
      const urlParts = image.imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1].split('.')[0];
      const publicId = `Imagger/users/${req.user}/${filename}`;
      
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {
      console.error("Cloudinary deletion failed:", cloudinaryError.message);
      // Continue deleting from DB even if Cloudinary delete fails
    }

    // Delete from MongoDB
    await imageModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

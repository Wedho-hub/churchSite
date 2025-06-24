export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  // Return the URL path to use on frontend
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ message: "Image uploaded", fileUrl });
};

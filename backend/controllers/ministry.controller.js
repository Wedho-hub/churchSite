import Ministry from "../models/Ministry.js";

export const getMinistries = async (req, res) => {
  try {
    const data = await Ministry.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ministries" });
  }
};

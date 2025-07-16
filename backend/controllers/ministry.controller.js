import Ministry from "../models/Ministry.js";

// ✅ GET: Fetch all ministries
export const getMinistries = async (req, res) => {
  try {
    const data = await Ministry.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ministries" });
  }
};

// ✅ POST: Create a new ministry
export const createMinistry = async (req, res) => {
  try {
    const newMinistry = new Ministry(req.body);
    await newMinistry.save();
    res.status(201).json({ message: "Ministry created", data: newMinistry });
  } catch (err) {
    res.status(400).json({ error: "Failed to create ministry", details: err.message });
  }
};

// ✅ PUT: Update an existing ministry
export const updateMinistry = async (req, res) => {
  try {
    const updated = await Ministry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Ministry not found" });
    }
    res.json({ message: "Ministry updated", data: updated });
  } catch (err) {
    res.status(400).json({ error: "Failed to update ministry", details: err.message });
  }
};

// ✅ DELETE: Remove a ministry
export const deleteMinistry = async (req, res) => {
  try {
    const deleted = await Ministry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Ministry not found" });
    }
    res.json({ message: "Ministry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete ministry", details: err.message });
  }
};

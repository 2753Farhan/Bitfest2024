import Ingredient from "../models/Ingredient.js";

// Add or increment an ingredient
export async function addIngredient(req, res) {
  try {
    const { name, quantity, unit } = req.body;

    const ingredient = await Ingredient.findOneAndUpdate(
      { name },
      { $set: { name, unit }, $inc: { quantity } },
      { new: true, upsert: true }
    );

    res.json({ success: true, ingredient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get all ingredients
export async function getIngredients(req, res) {
  try {
    const ingredients = await Ingredient.find();
    res.json({ success: true, ingredients });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update an ingredient
export async function updateIngredient(req, res) {
  try {
    const { id } = req.params; // Ingredient ID
    const { name, quantity, unit } = req.body;

    const ingredient = await Ingredient.findByIdAndUpdate(
      id,
      { name, quantity, unit },
      { new: true }
    );

    if (!ingredient) {
      return res.status(404).json({ success: false, message: "Ingredient not found" });
    }

    res.json({ success: true, ingredient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete an ingredient
export async function deleteIngredient(req, res) {
  try {
    const { id } = req.params; // Ingredient ID

    const ingredient = await Ingredient.findByIdAndDelete(id);

    if (!ingredient) {
      return res.status(404).json({ success: false, message: "Ingredient not found" });
    }

    res.json({ success: true, message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

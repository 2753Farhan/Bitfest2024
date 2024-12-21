import Ingredient from "../models/Ingredient.js";

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

export async function getIngredients(req, res) {
  try {
    const ingredients = await Ingredient.find();
    res.json({ success: true, ingredients });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

import { Schema, model } from "mongoose";

const IngredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, default: 0 }, // Can store quantities like "2" for 2 units
  unit: { type: String, default: "" }, // Units like "kg", "liters"
  updatedAt: { type: Date, default: Date.now },
});

export default model("Ingredient", IngredientSchema);

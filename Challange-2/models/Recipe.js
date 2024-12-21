import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 0 },
      unit: { type: String, default: "" },
    },
  ],
  cuisine: { type: String },
  taste: { type: String }, // e.g., "sweet", "spicy"
  preparationTime: { type: String }, // e.g., "30 minutes"
  reviews: { type: Number, default: 0 },
  instructions: { type: String, required: true },
});

export default model("Recipe", RecipeSchema);

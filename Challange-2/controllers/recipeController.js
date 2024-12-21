import Recipe from "../models/Recipe.js";
import fs from "fs";
import tesseract from "tesseract.js";

export async function addRecipe(req, res) {
  try {
    const { name, ingredients, cuisine, taste, preparationTime, instructions } = req.body;

    const recipe = await Recipe.create({
      name,
      ingredients,
      cuisine,
      taste,
      preparationTime,
      instructions,
    });

    res.json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function parseRecipes(req, res) {
  try {
    const filePath = req.file?.path; // For image uploads

    if (filePath) {
      const { data: { text } } = await tesseract.recognize(filePath, "eng");
      fs.appendFileSync("my_fav_recipes.txt", `\n${text}`);
    }

    res.json({ success: true, message: "Recipe added to my_fav_recipes.txt" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

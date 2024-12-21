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
    const filePath = req.file?.path; // File path for uploaded file
    const fileType = req.file?.mimetype; // MIME type of the uploaded file

    if (!filePath) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let extractedText = "";

    // Check file type (image or text)
    if (fileType.startsWith("image/")) {
      // Use Tesseract for OCR on images
      const { data: { text } } = await tesseract.recognize(filePath, "eng");
      extractedText = text;
    } else if (fileType === "text/plain") {
      // Read text from a plain text file
      extractedText = fs.readFileSync(filePath, "utf-8");
    } else {
      return res.status(400).json({ success: false, message: "Unsupported file type. Upload an image or a text file." });
    }

    // Append the extracted text to "my_fav_recipes.txt"
    fs.appendFileSync("my_fav_recipes.txt", `\n${extractedText}`);

    res.json({ success: true, message: "Recipe text added to my_fav_recipes.txt" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

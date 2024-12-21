import fs from "fs";
import path from "path";
import { ChatGroq } from "@langchain/groq";
import Ingredient from "../models/Ingredient.js";

export async function chatWithBot(req, res) {
  try {
    const { query } = req.body;

    // Fetch ingredients from the database
    const ingredients = await Ingredient.find();
    const availableIngredientNames = ingredients.map((ingredient) => ingredient.name);

    // Read recipes from the text file
    const recipeText = fs.readFileSync(path.join(process.cwd(), "uploads/my_fav_recipes.txt"), "utf8");

    const model = new ChatGroq({
      model: "mixtral-8x7b-32768",
      groqApiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
      Based on the following recipes:
      ${recipeText}

      Only suggest recipes that can be made with the following available ingredients:
      ${availableIngredientNames.join(", ")}.
      Do not include any additional ingredients not present in this list.
      User preference: ${query}.
    `;

    const response = await model.invoke([{ role: "user", content: prompt }]);

    let cleanSuggestion;

    try {
      // Attempt to parse the response if it is valid JSON
      const parsedResponse = JSON.parse(response.content);
      cleanSuggestion = {
        title: parsedResponse.title,
        ingredients: parsedResponse.ingredients,
        instructions: parsedResponse.instructions.join(" "),
      };
    } catch (parseError) {
      // Fallback: Treat the response as plain text and clean it up
      cleanSuggestion = response.content.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    }

    res.json({ success: true, suggestion: cleanSuggestion });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

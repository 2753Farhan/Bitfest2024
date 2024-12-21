import fs from "fs";
import path from "path";
import { ChatGroq } from "@langchain/groq";
import Ingredient from "../models/Ingredient.js";

export async function chatWithBot(req, res) {
  try {
    const { query } = req.body;

    // Step 1: Fetch ingredients from the database
    const ingredients = await Ingredient.find();
    const availableIngredientNames = ingredients.map((ingredient) => ingredient.name);

    // Step 2: Read the combined recipes from the text file
    const recipeFilePath = path.join(process.cwd(), "my_fav_recipes.txt");
    if (!fs.existsSync(recipeFilePath)) {
      return res.status(400).json({ success: false, message: "No recipes found in the system." });
    }
    const recipeText = fs.readFileSync(recipeFilePath, "utf8");

    // Step 3: Initialize the LLM (Groq)
    const model = new ChatGroq({
      model: "mixtral-8x7b-32768",
      groqApiKey: process.env.GROQ_API_KEY,
    });

    // Step 4: Build the prompt for the LLM
    const prompt = `
      I have the following available ingredients: ${availableIngredientNames.join(", ")}.
      Based on the following recipes:
      ${recipeText}

      Please suggest a recipe that matches the user's preference: "${query}".
      Only suggest recipes that can be prepared with the available ingredients.
      Exclude recipes that require any additional ingredients.
    `;

    // Step 5: Query the LLM for suggestions
    const response = await model.invoke([{ role: "user", content: prompt }]);

    let cleanSuggestion;

    try {
      // Attempt to parse the response if it's structured JSON
      const parsedResponse = JSON.parse(response.content);
      cleanSuggestion = {
        title: parsedResponse.title,
        ingredients: parsedResponse.ingredients,
        instructions: parsedResponse.instructions.join(" "),
      };
    } catch (parseError) {
      // Fallback: Treat the response as plain text
      cleanSuggestion = response.content.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    }

    // Step 6: Return the recipe suggestion
    res.json({ success: true, suggestion: cleanSuggestion });
  } catch (error) {
    console.error("Error in chatWithBot:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

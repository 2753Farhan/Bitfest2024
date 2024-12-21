import fs from "fs";
import { ChatGroq } from "@langchain/groq";

export async function chatWithBot(req, res) {
  try {
    const { query, availableIngredients } = req.body;

    const recipeText = fs.readFileSync("my_fav_recipes.txt", "utf8");

    const model = new ChatGroq({
      model: "mixtral-8x7b-32768",
      groqApiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
      Based on the following recipes:
      ${recipeText}

      Suggest a recipe for someone who has the following ingredients:
      ${availableIngredients.join(", ")}.
      User preference: ${query}.
    `;

    const response = await model.invoke([{ role: "user", content: prompt }]);

    res.json({ success: true, suggestion: response.content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

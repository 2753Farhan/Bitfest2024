import { Router } from "express";
import { addIngredient, getIngredients } from "../controllers/ingredientController.js";

const router = Router();

router.post("/add", addIngredient); // Add or update an ingredient
router.get("/", getIngredients); // Retrieve all ingredients

export default router;

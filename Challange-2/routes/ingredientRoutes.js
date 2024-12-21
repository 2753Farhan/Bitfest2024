import { Router } from "express";
import {
  addIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController.js";

const router = Router();

// Add or increment an ingredient
router.post("/add", addIngredient);

// Get all ingredients
router.get("/", getIngredients);

// Update an ingredient by ID
router.put("/update/:id", updateIngredient);

// Delete an ingredient by ID
router.delete("/delete/:id", deleteIngredient);

export default router;

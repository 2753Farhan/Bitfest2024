import { Router } from "express";
import multer from "multer";
import { addRecipe, parseRecipes } from "../controllers/recipeController.js";

const router = Router();
const upload = multer({ dest: "uploads/" }); // Set upload directory

router.post("/add", addRecipe); // Add a new recipe manually
router.post("/parse", upload.single("file"), parseRecipes); // Parse recipe from uploaded file (image or text)

export default router;

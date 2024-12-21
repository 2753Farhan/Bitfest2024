import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // MongoDB connection
import ingredientRoutes from "./routes/ingredientRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

// Load environment variables
config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/ingredients", ingredientRoutes); // Ingredient routes
app.use("/api/recipes", recipeRoutes); // Recipe routes
app.use("/api/chatbot", chatbotRoutes); // Chatbot routes

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Mofa's Recipe Management System is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

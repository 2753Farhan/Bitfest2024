# **Mofa's Kitchen Buddy**

A backend system designed to simplify recipe management and ingredient tracking. With Mofa's Kitchen Buddy, users can manage ingredients, parse recipes from text or images, and get personalized recipe suggestions using an AI-powered chatbot.

---

## **Software Requirements Specification (SRS)**

### **1. Introduction**

#### **1.1 Purpose**
**Mofa's Kitchen Buddy** is a backend system designed to simplify recipe management and ingredient tracking. It enables users to:
- Manage available ingredients at home.
- Parse and store recipe details from text files or images.
- Interact with an AI-powered chatbot for personalized recipe suggestions tailored to user preferences and available ingredients.

#### **1.2 Scope**
The system provides a robust backend for home cooks by:
- Storing and managing ingredient details in a database.
- Extracting recipes from text or images using OCR and NLP techniques.
- Leveraging AI chatbot capabilities to recommend recipes.
- Integrating Cloudinary for efficient image storage and management.

This API-driven system is modular, scalable, and designed for seamless integration into other applications.

---

### **2. Functional Requirements**

#### **2.1 Ingredient Management**
- Users can **add new ingredients** with quantity details.
- Users can **update ingredient quantities** after shopping or cooking.
- Ingredients are stored in a MongoDB database for easy retrieval and management.

#### **2.2 Recipe Retrieval**
- Users can upload:
  - Text files containing recipes.
  - Images of recipes, which are processed using OCR.
- The system parses recipe details (title, ingredients, instructions) and stores them in a centralized database.
- Cloudinary integration allows recipe images to be stored and accessed via URLs.

#### **2.3 AI Chatbot Integration**
- The system includes a chatbot powered by LangChain and Groq for:
  - Understanding user preferences (e.g., "I want a dessert").
  - Recommending recipes based on available ingredients and preferences.
- The chatbot processes recipes stored in a database and provides personalized suggestions.

---

### **3. Non-Functional Requirements**
- **Scalability**: The system can handle large volumes of recipes and ingredients with minimal performance degradation.
- **Reliability**: All components, including database operations, API requests, and external integrations, are designed to handle errors gracefully.
- **Efficiency**: Recipes are parsed and stored in an optimized format for quick retrieval by the chatbot.
- **Security**: Sensitive API keys (e.g., Cloudinary, Groq) are securely managed using environment variables.

---

### **4. Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Models**: LangChain, Groq
- **Image Storage**: Cloudinary
- **OCR**: Tesseract.js
- **API Management**: REST APIs

---
## API Endpoints

### Ingredient Management

#### 1. Add or Increment an Ingredient
- **Route**: `/api/ingredients/add`
- **Method**: `POST`
- **Payload**:
  ```json
  {
      "name": "Sugar",
      "quantity": 2,
      "unit": "kg"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "ingredient": {
          "_id": "64c1234abcd567890ef12345",
          "name": "Sugar",
          "quantity": 5,
          "unit": "kg",
          "__v": 0
      }
  }
  ```

#### 2. Get All Ingredients
- **Route**: `/api/ingredients/`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "success": true,
      "ingredients": [
          {
              "_id": "64c1234abcd567890ef12345",
              "name": "Sugar",
              "quantity": 5,
              "unit": "kg",
              "__v": 0
          },
          {
              "_id": "64c1234abcd567890ef67890",
              "name": "Flour",
              "quantity": 3,
              "unit": "kg",
              "__v": 0
          }
      ]
  }
  ```

#### 3. Update an Ingredient
- **Route**: `/api/ingredients/update/:id`
- **Method**: `PUT`
- **Payload**:
  ```json
  {
      "name": "Brown Sugar",
      "quantity": 4,
      "unit": "kg"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "ingredient": {
          "_id": "64c1234abcd567890ef12345",
          "name": "Brown Sugar",
          "quantity": 4,
          "unit": "kg",
          "__v": 0
      }
  }
  ```

#### 4. Delete an Ingredient
- **Route**: `/api/ingredients/delete/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
      "success": true,
      "message": "Ingredient deleted successfully"
  }
  ```

### Recipe Management

#### 1. Add a Recipe Manually
- **Route**: `/api/recipes/add`
- **Method**: `POST`
- **Payload**:
  ```json
  {
      "name": "Spaghetti Carbonara",
      "ingredients": ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Pepper"],
      "cuisine": "Italian",
      "taste": "Savory",
      "preparationTime": "30 minutes",
      "instructions": "Cook spaghetti, mix with pancetta, eggs, and cheese. Add pepper to taste."
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "recipe": {
          "_id": "64c1234abcd567890ef12345",
          "name": "Spaghetti Carbonara",
          "ingredients": ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Pepper"],
          "cuisine": "Italian",
          "taste": "Savory",
          "preparationTime": "30 minutes",
          "instructions": "Cook spaghetti, mix with pancetta, eggs, and cheese. Add pepper to taste.",
          "__v": 0
      }
  }
  ```

#### 2. Parse Recipes from File
- **Route**: `/api/recipes/parse`
- **Method**: `POST`
- **Payload**: Upload an image or text file with the key `file`
- **Response (Image)**:
  ```json
  {
      "success": true,
      "message": "Recipe text added to my_fav_recipes.txt"
  }
  ```

### Chatbot Integration

#### 1. Chat with the Chatbot
- **Route**: `/api/chatbot/chat`
- **Method**: `POST`
- **Payload**:
  ```json
  {
      "query": "I want something sweet today"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "suggestion": {
          "title": "Pancakes",
          "ingredients": ["Flour", "Milk", "Eggs", "Butter", "Sugar"],
          "instructions": "Mix all ingredients and cook on a skillet."
      }
  }
  ```


### **6. How to Run the Project**

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Set up environment variables**: Create a `.env` file in the root directory and add the following:
    ```env
   
    GROQ_API_KEY=your_groq_api_key
    MONGODB_URI=your_mongodb_connection_string
    ```

3. **Start the server**:
    ```bash
    npm start
    ```
4. **Access the API**: The server will run at `http://localhost:5000`.


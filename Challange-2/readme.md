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

### **5. API Endpoints**

#### **5.1 Ingredient Management**
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| POST   | `/api/ingredients/add` | Add a new ingredient          |
| PUT    | `/api/ingredients/update` | Update existing ingredient   |

#### **5.2 Recipe Management**
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/api/recipes/parse`   | Parse recipes from text files |
| POST   | `/api/recipes/add`     | Add a new recipe (image or text) |

#### **5.3 Chatbot**
| Method | Endpoint               | Description                            |
|--------|------------------------|----------------------------------------|
| POST   | `/api/chatbot/suggest` | Get recipe suggestions from chatbot    |

---

### **6. How to Run the Project**

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Set up environment variables**: Create a `.env` file in the root directory and add the following:
    ```env
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    GROQ_API_KEY=your_groq_api_key
    MONGODB_URI=your_mongodb_connection_string
    ```

3. **Start the server**:
    ```bash
    npm start
    ```

4. **Access the API**: The server will run at `http://localhost:5000`.

## 7. Future Enhancements

* **User Authentication**: Add user accounts for personalized recipe management.
* **Advanced Filtering**: Enable recipe filtering by taste, cuisine, or preparation time.
* **Integration with Shopping Apps**: Suggest missing ingredients and create shopping lists.

## 8. License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 9. Contributors

* Your Name - GitHub Profile
* Your Team Members (if applicable)

### How to Use:

1. Copy the above Markdown content into the README.md file of your project.
2. Replace placeholders like your_cloudinary_cloud_name, yourusername, etc., with your actual values.
3. Commit the README.md file to your repository.

This structure ensures your README is visually appealing and informative on GitHub.
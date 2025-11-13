# API Documentation

## 🍽️ Overview
The AI Recipe Assistant API takes an image of food ingredients, detects what ingredients are present, and uses a Large Language Model (LLM) to generate a creative recipe using only those ingredients.

---

### Base URL

- **Local** : http://127.0.0.1:8000
- **Deployment** : e.g. https://ai-recipe-backend.onrender.com

###  Endpoint: /detect_and_generate

- **Method** : POST
- **Description** : Uploads an image, detects ingredients in it, and generates a recipe suggestion using OpenAI’s GPT model.

### Request

1. Headers
   
| Key            | Value                 |
| -------------- | --------------------- |
| `Content-Type` | `multipart/form-data` |

2. Body Parameters

| Parameter | Type         | Required | Description                                                                                |
| --------- | ------------ | -------- | ------------------------------------------------------------------------------------------ |
| `file`    | `UploadFile` | ✅        | Image file containing visible ingredients (e.g., fruits, vegetables, packaged food items). |

---

###  Example Request (cURL)

```bash
curl -X POST "http://127.0.0.1:8000/detect_and_generate" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample_image.jpg"
```

### Response
✅ Success Response (200 OK)
```bash
{
  "ingredients": [
    {
      "name": "banana",
      "count": 1
    },
    {
      "name": "apple",
      "count": 3
    }
  ],
  "recipe": "**Recipe Name: Apple-Banana Fruit Fusion Salad**\n\n**Ingredients:**\n- 1 Banana\n- 3 Apples\n\n**Steps:**\n1. Wash and slice the fruits.\n2. Mix them in a bowl.\n3. Add a squeeze of lemon juice and serve chilled."
}
```

### Response Fields

| Field         | Type     | Description                                                                  |
| ------------- | -------- | ---------------------------------------------------------------------------- |
| `ingredients` | `array`  | List of detected ingredients with names and quantities.                      |
| `recipe`      | `string` | AI-generated recipe text including name, ingredients, and preparation steps. |


###  Error Response (500 Internal Server Error)
```bash
{
  "error": "The api_key client option must be set either by passing api_key to the client or by setting the OPENAI_API_KEY environment variable",
  "ingredients": []
}
```
| Field         | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `error`       | Error message (e.g. missing API key, model error, etc.)           |
| `ingredients` | List of detected ingredients if detection succeeded before error. |

---

## ⚙️ Environment Variables

OPENAI_API_KEY : Your OpenAI API key .

- Create a .env file in your project root:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## 💡 How It Works

1. **Upload an Image** – The user uploads an image of food ingredients.
2. **Ingredient Detection** – The detect_ingredients() function uses a computer vision model (e.g., YOLO, SSD) to identify ingredients.
3. **Recipe Generation** – Detected ingredient names are passed as a text prompt to OpenAI GPT (gpt-4o-mini) for recipe creation.
4. **JSON Response** – The API returns the detected ingredients and AI-generated recipe.

## 🔐 Security Notes

- Never expose your API key in frontend or public repos.
- Use environment variables for deployment.
- Limit image uploads to safe file types (.jpg, .jpeg, .png).
- Consider adding rate limiting for production use.

---

##  Example Integration (Frontend JS)

```bash
const formData = new FormData();
formData.append("file", selectedFile);

fetch("http://127.0.0.1:8000/detect_and_generate", {
  method: "POST",
  body: formData
})
  .then(res => res.json())
  .then(data => {
    console.log("Ingredients:", data.ingredients);
    console.log("Recipe:", data.recipe);
  })
  .catch(err => console.error(err));
```

---
## 🔧 Tech Stack

- Backend: FastAPI
- AI Model: OpenAI GPT-4o-mini (via OpenAI API)
- Detection: YOLOv8 (detect.py)
- Language: Python 3.10+
- Deployment: Railway/Render

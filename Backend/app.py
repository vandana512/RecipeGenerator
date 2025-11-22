from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
from detect import detect_ingredients
import google.generativeai as genai
import os
import traceback
from dotenv import load_dotenv
import json

load_dotenv(".env")  # Load .env for GEMINI_API_KEY

# ---- Initialize app ----
app = FastAPI(title="AI Recipe Assistant")

# ---- Enable CORS ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----  Endpoint ----
@app.post("/detect_and_generate")
async def detect_and_generate(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Run YOLO detection (detect_ingredients should return {"ingredients": [{"name":..., "count":...}, ...]})
        detected = detect_ingredients(temp_path)
        # Build ingredients list string for prompt
        ingredients_list = ", ".join([f"{i['count']} {i['name']}" for i in detected.get("ingredients", [])])

        # ---- LLM Prompt ----
        # Custom prompt logic
        if ingredients_list.strip() == "":
            prompt = """
        Return a result in this exact JSON format:

        {
          "title": "Unknown",
          "ingredients": [],
          "steps": []
        }
        """
        else:
            prompt = f"""
        You are a professional recipe generator AI.

        Using ONLY these ingredients: {ingredients_list}, generate a creative cooking recipe that involves 
        actual cooking steps (e.g., roasting, baking, stir-frying, steaming). Avoid salads, fruit mixes, 
        or any recipe that simply cuts and puts ingredients in a bowl to eat raw.

        Output JSON ONLY. No explanation, no markdown, no text besides JSON.

        JSON structure must be exactly:

        {{
          "title": "string",
          "ingredients": ["list of strings"],
          "steps": ["list of strings"]
        }}
        """

        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load model
        model = genai.GenerativeModel("gemini-2.5-flash")

# Call Gemini
        response = model.generate_content(prompt)

# Extract text safely
        content = response.text

        try:
            recipe_json = json.loads(content)
        except json.JSONDecodeError:
            recipe_json = {"recipe_text": content}

        return {
            "ingredients": detected.get("ingredients", []),
            "recipe": recipe_json
        }

    except Exception as e:
        print("❌ ERROR OCCURRED:")
        traceback.print_exc()
        return {"error": str(e), "ingredients": detected.get("ingredients", [])}
    finally:
        # cleanup temp file
        try:
            os.remove(temp_path)
        except Exception:
            pass

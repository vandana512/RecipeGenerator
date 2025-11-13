from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
from detect import detect_ingredients
from openai import OpenAI
import os
import traceback
from dotenv import load_dotenv
import json

load_dotenv(".env")  # Load .env for OPENAI_API_KEY

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

    # Run YOLO detection
    detected = detect_ingredients(temp_path)
    ingredients_list = ", ".join([f"{i['count']} {i['name']}" for i in detected["ingredients"]])

    # ---- LLM Prompt ----
    prompt = f"""
    You are a professional chef assistant.
    Using only these ingredients: {ingredients_list},
    generate a recipe response in **strict JSON** with this format:

    {{
      "recipe_name": "string",
      "ingredients": ["list of ingredients"],
      "steps": ["list of short numbered steps"]
    }}
    """

    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful AI chef assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        # Try to parse LLM output as JSON
        content = response.choices[0].message.content
        try:
            recipe_json = json.loads(content)
        except json.JSONDecodeError:
            # Fallback to raw text if not valid JSON
            recipe_json = {"recipe_text": content}

        return {
            "ingredients": detected["ingredients"],
            "recipe": recipe_json
        }

    except Exception as e:
        print("❌ ERROR OCCURRED:")
        traceback.print_exc()
        return {"error": str(e), "ingredients": detected["ingredients"]}

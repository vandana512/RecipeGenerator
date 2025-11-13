# Backend (YOLOv8 + LLM)

- This backend powers the AI Recipe Assistant, a system that detects visible food ingredients from an image (via YOLOv8) and generates a creative recipe suggestion (via OpenAI GPT-4o-mini).

---

## ⚙️ System Overview
| Module               | Description                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| **YOLOv8 (Vision)**  | Detects and counts ingredients in the uploaded image.                                        |
| **LLM (OpenAI GPT)** | Generates a natural-language recipe using detected ingredients.                              |
| **FastAPI**          | Exposes REST endpoints (`/detect` and `/detect_and_generate`) for integration with frontend. |
| **CORS Middleware**  | Enables frontend communication (React app / mobile camera).                                  |

---
## Architecture

```bash
 User Uploads Image
        │
        ▼
 YOLOv8 (detect.py)
  → Detects food items
  → Returns names & counts
        │
        ▼
 OpenAI GPT-4o-mini
  → Generates recipe using detected items
        │
        ▼
 FastAPI JSON Response
  {
    "ingredients": [...],
    "recipe": "..."
  }

```

---
## YOLOv8 Detection Logic

File: **detect.py**
- YOLOv8n model: A lightweight, pre-trained neural network from Ultralytics.
- Task: Object detection (detects what food items appear in the image).
- Output: JSON list with names and counts
- Customizable: Can be fine-tuned with a custom dataset (e.g., “Food-101” or self-labeled kitchen images).

```bash
{
  "ingredients": [
    {"name": "banana", "count": 1},
    {"name": "apple", "count": 3}
  ]
}
```



| Model        | Description                    | Speed    | Accuracy            |
| ------------ | ------------------------------ | -------- | ------------------- |
| `yolov8n.pt` | Nano version (used in project) | ⚡ Fast   | 🟢 Good for demo    |
| `yolov8m.pt` | Medium model                   | Moderate | 🔵 Better detection |
| `yolov8l.pt` | Large model                    | Slower   | 🔴 Highest accuracy |


---
## LLM Recipe Generation Logic

File: **app.py**

1. Accepts an uploaded image (multipart/form-data).
2. Passes the image to YOLO for ingredient detection.
3. Formats the detected ingredients into a text prompt.
4. Sends the prompt to OpenAI GPT-4o-mini.
5. Returns the generated recipe in JSON.

---

## 🧰 Environment Setup

1. Install dependencies:

```
pip install -r requirements.txt
```

2. Create .env file:
   
```
OPENAI_API_KEY=your_openai_api_key_here
```
3. Change Directory:
```
cd Backend
```
4. Run the backend:

```
uvicorn app:app --reload
```

5. Then open → http://127.0.0.1:8000/docs


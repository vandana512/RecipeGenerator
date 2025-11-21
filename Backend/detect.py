from ultralytics import YOLO
from collections import Counter
import os
import sys

def load_model():
    model_path = "Backend/yolov8n.pt"  # adjust if your weights are elsewhere

    # If the model file doesn’t exist, YOLO will auto-download it when using "yolov8n.pt"
    if not os.path.exists(model_path):
        print("🔽 YOLOv8n model not found locally — loading default 'yolov8n.pt' (auto-download if needed)...")
        model = YOLO("yolov8n.pt")
    else:
        model = YOLO(model_path)

    return model

def detect_ingredients(image_path):
    model = load_model()
    results = model(image_path)
    res = results[0]

    # if no boxes found:
    if not hasattr(res, "boxes") or res.boxes is None or len(res.boxes) == 0:
        return {"ingredients": []}

    # Get class ids properly
    try:
        # ultralytics returns boxes.cls as tensor
        class_ids = res.boxes.cls.cpu().numpy().astype(int).tolist()
    except Exception:
        # fallback if conversion differs
        try:
            class_ids = [int(x) for x in res.boxes.cls.tolist()]
        except Exception:
            class_ids = []

    # Map to names
    detected_items = [res.names[int(i)] for i in class_ids]

    # Count occurrences
    counts = Counter(detected_items)

    return {
        "ingredients": [{"name": name, "count": count} for name, count in counts.items()]
    }

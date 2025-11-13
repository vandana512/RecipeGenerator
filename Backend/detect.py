from ultralytics import YOLO
from collections import Counter
import os
import sys


def load_model():
    model_path = "Backend/yolov8n.pt"

    # If the model file doesn’t exist, YOLO will auto-download it
    if not os.path.exists(model_path):
        print("🔽 YOLOv8n model not found — downloading automatically...")
        model = YOLO("yolov8n.pt")  # YOLO will fetch from its repo
    else:
        model = YOLO(model_path)

    return model


def detect_ingredients(image_path):

    model = load_model()
    #model = YOLO("yolov8n.pt")  # Pretrained YOLOv8 model
    
    results = model(image_path)
    res = results[0]

    if res.boxes is None or len(res.boxes) == 0:
        return {"ingredients": []}

    # Extract class IDs
    class_ids = res.boxes.cls.tolist()
    detected_items = [res.names[int(i)] for i in class_ids]

    # Count occurrences
    counts = Counter(detected_items)

    # Return clean JSON structure
    return {
        "ingredients": [{"name": name, "count": count} for name, count in counts.items()]
    }

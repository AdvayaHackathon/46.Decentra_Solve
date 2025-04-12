import os
import threading
import time
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from gpt4all import GPT4All
import requests
import schedule
import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import google.generativeai as genai

# === SETUP ===

app = Flask(__name__)
CORS(app)

# GPT4All model
gpt_model = GPT4All(
    "C:/Users/yashr/AppData/Local/nomic.ai/GPT4All/gpt4all-falcon-newbpe-q4_0.gguf",
    allow_download=False
)

# Gemini setup
genai.configure(api_key="AIzaSyBORbTjaV4axhDCtV5Z2yKDUsBMWUsTiCw")

# Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Pain level model and scaler
pain_model = load_model("model/pain_level_classifier_model.h5")
scaler = joblib.load("model/scaler.pkl")
label_map = {0: "mild", 1: "moderate", 2: "severe"}

# Upload path
UPLOAD_FOLDER = "./temp"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Backend URL for meds
BACKEND_URL = 'http://localhost:5000/medications'

# === 1. PAIN LEVEL PREDICTION ===
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = np.array([[data["baseline_fhr"], data["variability"], data["accelerations"], data["decelerations"]]])
    scaled = scaler.transform(features)
    prediction = pain_model.predict(scaled)
    label = label_map[np.argmax(prediction)]
    return jsonify({"pain_level": label})

# === 2. GPT4All CHATBOT ===
@app.route('/chat', methods=['POST'])
def chat():
    prompt = request.json.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    response = gpt_model.generate(prompt)
    return jsonify({"response": response})

# === 3. MEDICATION REMINDER SCHEDULER ===
def check_meds():
    try:
        meds = requests.get(BACKEND_URL).json()
        now = datetime.now().strftime('%H:%M')
        for med in meds:
            if not med['taken'] and med['time'] == now:
                print(f"🔔 Reminder: Take {med['name']} ({med['dosage']}) at {med['time']}")
    except Exception as e:
        print("Error checking meds:", e)

schedule.every(1).minutes.do(check_meds)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

# === 4. APPOINTMENT EMAIL GENERATOR ===
@app.route('/generate-email', methods=['POST'])
def generate_email():
    data = request.get_json()
    message = f"""
    Hello {data.get('userName')},

    This is a gentle reminder for your upcoming appointment with Dr. {data.get('doctorName')} scheduled at {data.get('time')}.

    Please be on time and bring any necessary documents.

    Stay healthy!
    - HealthBot
    """
    return jsonify({"message": message.strip()})

# === 5. ANOMALY SCAN ANALYZER ===
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    return "".join(page.get_text() for page in doc)

def extract_text_from_image(image_path):
    return pytesseract.image_to_string(Image.open(image_path))

def analyze_with_gemini(text):
    prompt = f"""
    You are a medical assistant AI. Given the following ultrasound or anomaly scan report:
    ------
    {text}
    ------
    Please do the following:
    1. Identify if the baby appears normal or if there is any anomaly.
    2. If there's an anomaly, explain it briefly.
    3. Provide simple health advice for the mother.
    4. Respond in a human-friendly tone for non-medical users.
    """
    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(prompt)
    return response.text.strip()

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    ext = file.filename.split(".")[-1].lower()
    text = extract_text_from_pdf(filepath) if ext == "pdf" else extract_text_from_image(filepath) if ext in ["png", "jpg", "jpeg", "webp"] else None

    if not text:
        return jsonify({"error": "Unsupported file type"}), 400

    result = analyze_with_gemini(text)
    return jsonify({"result": result})

# === 6. STATUS CHECK ===
@app.route('/status', methods=['GET'])
def status():
    return jsonify({"message": "✅ AI Agent + Scheduler + Pain Classifier + Analyzer Running"})

# === RUN SERVER + SCHEDULER ===
if __name__ == '__main__':
    threading.Thread(target=run_scheduler).start()
    app.run(debug=True, port=5001)

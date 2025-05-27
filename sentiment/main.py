import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Load API key from environment variable
genai.configure(api_key=os.getenv("GENAI_API_KEY"))

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.get_json()
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        model = genai.GenerativeModel("gemini-pro")
        prompt = f"Analyze the sentiment (positive, negative, or neutral) of this feedback and reply with one word only: {text}"
        response = model.generate_content(prompt)

        sentiment_text = response.text.strip().lower()

        if sentiment_text.startswith("positive"):
            sentiment = "positive"
        elif sentiment_text.startswith("negative"):
            sentiment = "negative"
        else:
            sentiment = "neutral"

        return jsonify({"sentiment": sentiment})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(port=5000)

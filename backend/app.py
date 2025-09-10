from flask import Flask, request, jsonify
from flask_cors import CORS   #  fixes CORS issue
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # allow frontend (React) to talk to backend

# ---------- Step 1: Load dataset ----------
data = pd.read_csv("backend/house_prices.csv")

X = data[["area", "bedrooms", "bathrooms", "stories", "parking"]]  # features
y = data["price"]  # target

# ---------- Step 2: Train model ----------
model = LinearRegression()
model.fit(X, y)

# Save model (optional)
joblib.dump(model, "house_price_model.pkl")


# ---------- Step 3: API for prediction ----------
@app.route('/predict', methods=['POST'])
def predict():
    content = request.json
    area = content['area']
    bedrooms = content['bedrooms']
    bathrooms = content['bathrooms']
    stories = content['stories']
    parking = content['parking']

    prediction = model.predict([[area, bedrooms, bathrooms, stories, parking]])

    return jsonify({"predicted_price": round(prediction[0], 2)})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's port or default 5000
    app.run(host="0.0.0.0", port=port, debug=True)

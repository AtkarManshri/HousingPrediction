import { useState } from "react";

function App() {
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [stories, setStories] = useState("");
  const [parking, setParking] = useState("");
  const [prediction, setPrediction] = useState(null);

  // ✅ Make function async
  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: parseInt(area),
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          stories: parseInt(stories),
          parking: parseInt(parking),
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      // 👇 Use the same key as Flask sends
      setPrediction(data.predicted_price);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 House Price Prediction</h1>

      <label>Area (sq ft): </label>
      <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
      <br />

      <label>Bedrooms: </label>
      <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
      <br />

      <label>Bathrooms: </label>
      <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
      <br />

      <label>Stories: </label>
      <input type="number" value={stories} onChange={(e) => setStories(e.target.value)} />
      <br />

      <label>Parking: </label>
      <input type="number" value={parking} onChange={(e) => setParking(e.target.value)} />
      <br />

      <button onClick={handlePredict}>Predict Price</button>

      {prediction && <h2>💰 Predicted Price: ₹{prediction}</h2>}
    </div>
  );
}

export default App;

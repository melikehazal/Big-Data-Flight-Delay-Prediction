import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // /samples endpoint'inden rastgele uçuş verisi al
  useEffect(() => {
    axios.get("http://localhost:8000/samples")
      .then((res) => setSamples(res.data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  // Kullanıcının tıkladığı veriyi tahmin ettir
  const handlePredict = () => {
    if (!selected) return;
    const payload = {
      year: selected.year,
      month: selected.month,
      arr_flights: selected.arr_flights,
      arr_delay: selected.arr_delay,
      arr_del15: selected.arr_del15
    };
    axios.post("http://localhost:8000/predict", [payload])
      .then((res) => setPrediction(res.data.predictions[0]))
      .catch((err) => console.error("Tahmin hatası:", err));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Uçuş Gecikme Tahmini</h1>

      <h2>Rastgele Örnekler:</h2>
      {samples.length === 0 && <p>Yükleniyor...</p>}
      <ul>
        {samples.map((s, i) => (
          <li key={i} style={{ marginBottom: "1rem", cursor: "pointer" }}
              onClick={() => { setSelected(s); setPrediction(null); }}>
            <strong>{s.carrier_name}</strong> - {s.airport_name} ({s.month}/{s.year})<br />
            Uçuş: {s.arr_flights} | Toplam Gecikme: {s.arr_delay} dk | 15dk+ Gecikme: {s.arr_del15}
          </li>
        ))}
      </ul>

      {selected && (
        <>
          <h3>Seçilen Veri:</h3>
          <pre>{JSON.stringify(selected, null, 2)}</pre>
          <button onClick={handlePredict}>Tahmin Et</button>
        </>
      )}

      {prediction !== null && (
        <div style={{ marginTop: "1rem" }}>
          <h2>🧠 Tahmini Gecikme: {prediction.toFixed(2)} dakika</h2>
        </div>
      )}
    </div>
  );
}

export default App;

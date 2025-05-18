import React, { useState } from 'react';

export default function ServiceAdvisorTool() {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [result, setResult] = useState(null);

  const data = {
    "Toyota": {
      "Corolla": {
        "2018": [
          { "minKm": 15000, "service": "החלפת שמן מנוע + פילטר" },
          { "minKm": 30000, "service": "בדיקת בלמים" }
        ]
      }
    }
  };

  const handleSubmit = () => {
    const services = data[manufacturer]?.[model]?.[year];
    if (!services) {
      setResult(["לא נמצאו נתונים לדגם שנבחר."]);
      return;
    }
    const mileageNum = parseInt(mileage) * 1000;
    const dueServices = services.filter(s => mileageNum >= s.minKm).map(s => s.service);
    setResult(dueServices.length > 0 ? dueServices : ["לא נדרש טיפול כעת."]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>מערכת ייעוץ טיפולים לרכב</h2>
      <input placeholder="יצרן" onChange={e => setManufacturer(e.target.value)} /><br />
      <input placeholder="דגם" onChange={e => setModel(e.target.value)} /><br />
      <input placeholder="שנת ייצור" onChange={e => setYear(e.target.value)} /><br />
      <input placeholder="קילומטראז' באלפים" type="number" onChange={e => setMileage(e.target.value)} /><br />
      <button onClick={handleSubmit}>קבל מפרט טיפולים</button>
      {result && (
        <div>
          <h4>תוצאות:</h4>
          <ul>{result.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

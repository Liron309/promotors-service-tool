
import React, { useState } from 'react';

const autocomplete = {
  "manufacturers": [
    "Toyota",
    "Hyundai",
    "Mazda",
    "Kia",
    "Peugeot",
    "Skoda",
    "Volkswagen",
    "Nissan",
    "Renault",
    "BYD",
    "JAECOO"
  ],
  "models": {
    "Toyota": [
      "קורולה",
      "יאריס",
      "ראב 4",
      "אוונסיס"
    ],
    "Hyundai": [
      "i20",
      "i30",
      "טוסון",
      "קונה"
    ],
    "Mazda": [
      "2",
      "3",
      "CX-5",
      "CX-30"
    ],
    "Kia": [
      "פיקנטו",
      "ספורטאז׳",
      "נירו",
      "סטוניק"
    ],
    "Peugeot": [
      "208",
      "2008",
      "3008",
      "508"
    ],
    "Skoda": [
      "פאביה",
      "ראפיד",
      "סופרב",
      "אוקטביה"
    ],
    "Volkswagen": [
      "גולף",
      "פאסאט",
      "טיגואן",
      "טוארג"
    ],
    "Nissan": [
      "קשקאי",
      "ג׳וק",
      "X-Trail",
      "מיקרה"
    ],
    "Renault": [
      "קליאו",
      "קפצ׳ור",
      "מגאן",
      "קוליאוס"
    ],
    "BYD": [
      "Atto 3",
      "Dolphin",
      "Seal",
      "Tang"
    ],
    "JAECOO": [
      "J7"
    ]
  }
};

export default function ServiceAdvisorTool() {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [result, setResult] = useState(null);

  const data = {
  "BYD": {
    "Atto 3": {
      "2023": [
        {
          "minKm": 15000,
          "service": "בדיקת בלמים, עדכון תוכנה, בדיקת סוללה"
        },
        {
          "minKm": 30000,
          "service": "בדיקת מערכת מתלים, החלפת פילטר תא נוסעים"
        }
      ]
    },
    "Dolphin": {
      "2023": [
        {
          "minKm": 15000,
          "service": "בדיקת בלמים, החלפת פילטר אוויר"
        },
        {
          "minKm": 30000,
          "service": "בדיקת סוללה ובדיקת מערכת מיזוג"
        }
      ]
    }
  },
  "JAECOO": {
    "J7": {
      "2024": [
        {
          "minKm": 15000,
          "service": "החלפת שמן מנוע, בדיקת בלמים"
        },
        {
          "minKm": 30000,
          "service": "בדיקת מערכת היברידית, עדכון תוכנה"
        }
      ]
    }
  },
  "Peugeot": {
    "3008": {
      "2021": [
        {
          "minKm": 15000,
          "service": "בדיקת בלמים, החלפת שמן מנוע"
        },
        {
          "minKm": 30000,
          "service": "החלפת פילטרים ובדיקת מתלים"
        }
      ]
    },
    "208": {
      "2022": [
        {
          "minKm": 15000,
          "service": "החלפת שמן מנוע, בדיקת מיזוג"
        },
        {
          "minKm": 30000,
          "service": "בדיקת בלמים, עדכון תוכנה"
        }
      ]
    }
  }
};

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleSubmit = () => {
    let mileageNum = parseInt(mileage);
    if (mileageNum < 1000) {
      mileageNum *= 1000;
    }

    const services = data[capitalize(manufacturer)]?.[capitalize(model)]?.[year];
    if (!services) {
      setResult(["לא נמצאו נתונים לדגם שנבחר."]);
      return;
    }
    const dueServices = services.filter(s => mileageNum >= s.minKm).map(s => s.service);
    setResult(dueServices.length > 0 ? dueServices : ["לא נדרש טיפול כעת."]);
  };

  return (
    <div style={ maxWidth: '600px', margin: 'auto', padding: '20px' }>
      <h2>מערכת ייעוץ טיפולים לרכב</h2>
      <label>בחר יצרן:</label>
      <select onChange={e => setManufacturer(e.target.value)}>
        <option value="">--בחר--</option>
        {autocomplete.manufacturers.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select><br />

      <label>בחר דגם:</label>
      <select onChange={e => setModel(e.target.value)} disabled={!manufacturer}>
        <option value="">--בחר--</option>
        {manufacturer && autocomplete.models[manufacturer]?.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select><br />

      <input placeholder="שנת ייצור (לדוג׳: 2023)" onChange={e => setYear(e.target.value)} /><br />
      <input placeholder="קילומטראז׳ (לדוג׳: 15 = 15,000)" type="number" onChange={e => setMileage(e.target.value)} /><br />
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

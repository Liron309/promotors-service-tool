
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
        {
          "minKm": 80000,
          "service": "החלפת שמן מנוע + פילטר שמן"
        },
        {
          "minKm": 90000,
          "service": "בדיקת רפידות בלמים והחלפת פילטר מזגן"
        }
      ]
    }
  },
  "Hyundai": {
    "i30": {
      "2019": [
        {
          "minKm": 60000,
          "service": "בדיקת מערכת בלמים והחלפת נוזל קירור"
        },
        {
          "minKm": 90000,
          "service": "החלפת פלאגים ובדיקת מצבר"
        }
      ]
    }
  },
  "Mazda": {
    "3": {
      "2020": [
        {
          "minKm": 70000,
          "service": "בדיקת מערכת הגה וכיוון פרונט"
        },
        {
          "minKm": 100000,
          "service": "החלפת שמן גיר"
        }
      ]
    }
  },
  "Kia": {
    "Sportage": {
      "2020": [
        {
          "minKm": 60000,
          "service": "החלפת שמן מנוע ובדיקת בלמים"
        },
        {
          "minKm": 90000,
          "service": "החלפת פלאגים ובדיקת תיבת הילוכים"
        }
      ]
    }
  },
  "Skoda": {
    "Octavia": {
      "2021": [
        {
          "minKm": 30000,
          "service": "בדיקת בלמים והחלפת פילטר אוויר"
        },
        {
          "minKm": 60000,
          "service": "החלפת שמן מנוע + מסנן שמן"
        }
      ]
    }
  },
  "Mitsubishi": {
    "Outlander": {
      "2019": [
        {
          "minKm": 60000,
          "service": "בדיקת מתלים ובלמים"
        },
        {
          "minKm": 90000,
          "service": "החלפת שמן גיר"
        }
      ]
    }
  },
  "Suzuki": {
    "Vitara": {
      "2020": [
        {
          "minKm": 40000,
          "service": "בדיקת מערכת חשמל"
        },
        {
          "minKm": 80000,
          "service": "החלפת פילטר דלק"
        }
      ]
    }
  },
  "Renault": {
    "Megane": {
      "2018": [
        {
          "minKm": 60000,
          "service": "בדיקת מערכת מיזוג"
        },
        {
          "minKm": 90000,
          "service": "החלפת רפידות בלמים"
        }
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
    const mileageNum = parseInt(mileage);
    const dueServices = services.filter(s => mileageNum >= s.minKm).map(s => s.service);
    setResult(dueServices.length > 0 ? dueServices : ["לא נדרש טיפול כעת."]);
  };

  return (
    <div style={ maxWidth: '600px', margin: 'auto', padding: '20px' }>
      <h2>מערכת ייעוץ טיפולים לרכב</h2>
      <input placeholder="יצרן (לדוג׳: Toyota)" onChange={e => setManufacturer(e.target.value)} /><br />
      <input placeholder="דגם (לדוג׳: Corolla)" onChange={e => setModel(e.target.value)} /><br />
      <input placeholder="שנת ייצור (לדוג׳: 2018)" onChange={e => setYear(e.target.value)} /><br />
      <input placeholder="קילומטראז׳ נוכחי" type="number" onChange={e => setMileage(e.target.value)} /><br />
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

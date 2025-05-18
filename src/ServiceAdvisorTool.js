
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ServiceAdvisorTool() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [result, setResult] = useState(null);

  const data = {
    "Toyota": {
      "Corolla": {
        "2018": [
          { minKm: 80000, service: "החלפת שמן מנוע + פילטר שמן" },
          { minKm: 90000, service: "בדיקת רפידות בלמים והחלפת פילטר מזגן" },
        ]
      }
    },
    "Hyundai": {
      "i30": {
        "2019": [
          { minKm: 60000, service: "בדיקת מערכת בלמים והחלפת נוזל קירור" },
          { minKm: 90000, service: "החלפת פלאגים ובדיקת מצבר" },
        ]
      }
    },
    "Mazda": {
      "3": {
        "2020": [
          { minKm: 70000, service: "בדיקת מערכת הגה וכיוון פרונט" },
          { minKm: 100000, service: "החלפת שמן גיר" },
        ]
      }
    }
  };

  const handleSubmit = () => {
    const services = data[manufacturer]?.[model]?.[year];
    if (!services) {
      setResult("לא נמצאו נתונים לדגם שנבחר.");
      return;
    }
    const mileageNum = parseInt(mileage);
    const dueServices = services.filter(s => mileageNum >= s.minKm).map(s => s.service);
    setResult(dueServices.length > 0 ? dueServices : ["לא נדרש טיפול כעת."]);
  };

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Select onValueChange={setManufacturer}>
            <SelectTrigger>
              <SelectValue placeholder="בחר יצרן רכב" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Hyundai">Hyundai</SelectItem>
              <SelectItem value="Mazda">Mazda</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="דגם (לדוג׳: Corolla)" onChange={e => setModel(e.target.value)} />
          <Input placeholder="שנת ייצור (לדוג׳: 2018)" onChange={e => setYear(e.target.value)} />
          <Input placeholder="קילומטראז׳ נוכחי" type="number" onChange={e => setMileage(e.target.value)} />

          <Button onClick={handleSubmit}>קבל מפרט טיפולים</Button>

          {result && (
            <div className="pt-4">
              <h3 className="font-bold">תוצאות:</h3>
              <ul className="list-disc list-inside">
                {result.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

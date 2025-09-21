// src/components/SimulationPanel.tsx

import React, { useState } from "react";
import styles from "../styles/SimulationPanel.module.css";

interface SimulationPanelProps {
  useOfficialGuidelines?: boolean; // ✅ new prop
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({
  useOfficialGuidelines = true,
}) => {
  const [cholesterol, setCholesterol] = useState(200);
  const [bloodPressure, setBloodPressure] = useState(120);
  const [bmi, setBmi] = useState(25);
  const [glucose, setGlucose] = useState(100);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);

  const calculateRisk = () => {
    let risk = "Low";
    const riskReasons: string[] = [];

    if (useOfficialGuidelines) {
      // ✅ Official thresholds (standard)
      if (cholesterol >= 240) {
        risk = "High";
        riskReasons.push("High cholesterol (>240 mg/dL)");
      } else if (cholesterol >= 200) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Borderline cholesterol (200–239 mg/dL)");
      }

      if (bloodPressure >= 140) {
        risk = "High";
        riskReasons.push("High blood pressure (>140 mmHg)");
      } else if (bloodPressure >= 120) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Elevated blood pressure (120–139 mmHg)");
      }

      if (bmi >= 30) {
        risk = "High";
        riskReasons.push("Obesity (BMI ≥ 30)");
      } else if (bmi >= 25) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Overweight (BMI 25–29.9)");
      }

      if (glucose >= 126) {
        risk = "High";
        riskReasons.push("Diabetes (Glucose ≥ 126 mg/dL)");
      } else if (glucose >= 100) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Prediabetes (Glucose 100–125 mg/dL)");
      }
    } else {
      // ✅ Custom thresholds (example: stricter)
      if (cholesterol >= 220) {
        risk = "High";
        riskReasons.push("Cholesterol above 220 mg/dL (custom)");
      } else if (cholesterol >= 180) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Borderline cholesterol above 180 mg/dL (custom)");
      }

      if (bloodPressure >= 135) {
        risk = "High";
        riskReasons.push("Blood pressure above 135 mmHg (custom)");
      } else if (bloodPressure >= 110) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Elevated blood pressure above 110 mmHg (custom)");
      }

      if (bmi >= 28) {
        risk = "High";
        riskReasons.push("Obesity (BMI ≥ 28 custom)");
      } else if (bmi >= 23) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Overweight (BMI ≥ 23 custom)");
      }

      if (glucose >= 110) {
        risk = "High";
        riskReasons.push("Diabetes risk (Glucose ≥ 110 mg/dL custom)");
      } else if (glucose >= 90) {
        risk = risk === "Low" ? "Medium" : risk;
        riskReasons.push("Prediabetes risk (Glucose ≥ 90 mg/dL custom)");
      }
    }

    setRiskLevel(risk);
    setReasons(riskReasons);
  };

  return (
    <div className={styles.panel}>
      <h2>What-if Simulation</h2>

      <label>
        Cholesterol (mg/dL):
        <input
          type="number"
          value={cholesterol}
          onChange={(e) => setCholesterol(Number(e.target.value))}
        />
      </label>

      <label>
        Blood Pressure (mmHg):
        <input
          type="number"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(Number(e.target.value))}
        />
      </label>

      <label>
        BMI:
        <input
          type="number"
          value={bmi}
          onChange={(e) => setBmi(Number(e.target.value))}
        />
      </label>

      <label>
        Glucose (mg/dL):
        <input
          type="number"
          value={glucose}
          onChange={(e) => setGlucose(Number(e.target.value))}
        />
      </label>

      <button onClick={calculateRisk}>Run Simulation</button>

      {riskLevel && (
        <div className={styles.results}>
          <h3>
            Risk Level:{" "}
            <span
              style={{
                color:
                  riskLevel === "High"
                    ? "red"
                    : riskLevel === "Medium"
                    ? "orange"
                    : "green",
              }}
            >
              {riskLevel}
            </span>
          </h3>
          <ul>
            {reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimulationPanel;

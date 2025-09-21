import React, { useState } from "react";
import styles from "../styles/SimulationPanel.module.css";

interface SimulationResult {
  riskLevel: string;
  reasons: string[];
}

const SimulationPanel: React.FC = () => {
  const [cholesterol, setCholesterol] = useState<number>(200);
  const [bloodPressure, setBloodPressure] = useState<number>(120);
  const [bmi, setBmi] = useState<number>(25);
  const [glucose, setGlucose] = useState<number>(100);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const evaluateRisk = () => {
    const reasons: string[] = [];
    let risk = "Low";

    if (cholesterol > 240) {
      reasons.push("High cholesterol (>240 mg/dL)");
      risk = "High";
    } else if (cholesterol >= 200) {
      reasons.push("Borderline cholesterol (200–239 mg/dL)");
      if (risk !== "High") risk = "Medium";
    }

    if (bloodPressure > 140) {
      reasons.push("High blood pressure (>140 mmHg)");
      risk = "High";
    } else if (bloodPressure >= 120) {
      reasons.push("Elevated blood pressure (120–139 mmHg)");
      if (risk !== "High") risk = "Medium";
    }

    if (bmi >= 30) {
      reasons.push("Obesity (BMI ≥ 30)");
      risk = "High";
    } else if (bmi >= 25) {
      reasons.push("Overweight (BMI 25–29.9)");
      if (risk !== "High") risk = "Medium";
    }

    if (glucose >= 126) {
      reasons.push("Diabetes (Glucose ≥ 126 mg/dL)");
      risk = "High";
    } else if (glucose >= 100) {
      reasons.push("Prediabetes (Glucose 100–125 mg/dL)");
      if (risk !== "High") risk = "Medium";
    }

    setResult({ riskLevel: risk, reasons });
  };

  return (
    <div className={styles.panel}>
      <h2>What-if Simulation</h2>
      <p>Adjust the values below to simulate patient risk level.</p>

      <div className={styles.inputs}>
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
      </div>

      <button className={styles.button} onClick={evaluateRisk}>
        Run Simulation
      </button>

      {result && (
        <div className={styles.result}>
          <h3>Risk Level: {result.riskLevel}</h3>
          {result.reasons.length > 0 ? (
            <ul>
              {result.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          ) : (
            <p>No major risk factors detected.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimulationPanel;

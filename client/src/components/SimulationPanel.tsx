import React, { useState } from "react";
import styles from "../styles/SimulationPanel.module.css";
import { useTranslation } from "react-i18next";

interface SimulationPanelProps {
  useOfficialGuidelines: boolean;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({
  useOfficialGuidelines,
}) => {
  const { t } = useTranslation();

  const [cholesterol, setCholesterol] = useState(200);
  const [bloodPressure, setBloodPressure] = useState(120);
  const [bmi, setBmi] = useState(25);
  const [glucose, setGlucose] = useState(100);
  const [risk, setRisk] = useState<string | null>(null);

  const runSimulation = () => {
    let newRisk = "Low";

    if (cholesterol > 240 || bloodPressure > 140 || bmi >= 30 || glucose >= 126) {
      newRisk = "High";
    } else if (
      (cholesterol >= 200 && cholesterol <= 239) ||
      (bloodPressure >= 130 && bloodPressure <= 139) ||
      (bmi >= 25 && bmi < 30) ||
      (glucose >= 100 && glucose <= 125)
    ) {
      newRisk = "Medium";
    }

    setRisk(newRisk);
  };

  return (
    <div className={styles.panel}>
      <h2>{t("simulation")}</h2>

      <div className={styles.field}>
        <label>{t("cholesterol")}:</label>
        <input
          type="number"
          value={cholesterol}
          onChange={(e) => setCholesterol(Number(e.target.value))}
        />
      </div>

      <div className={styles.field}>
        <label>{t("bloodPressure")}:</label>
        <input
          type="number"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(Number(e.target.value))}
        />
      </div>

      <div className={styles.field}>
        <label>{t("bmi")}:</label>
        <input
          type="number"
          value={bmi}
          onChange={(e) => setBmi(Number(e.target.value))}
        />
      </div>

      <div className={styles.field}>
        <label>{t("glucose")}:</label>
        <input
          type="number"
          value={glucose}
          onChange={(e) => setGlucose(Number(e.target.value))}
        />
      </div>

      <button onClick={runSimulation} className={styles.button}>
        {t("runSimulation")}
      </button>

      {risk && (
        <div className={styles.result}>
          <strong>{t("riskLevel")}:</strong> {risk}
        </div>
      )}
    </div>
  );
};

export default SimulationPanel;

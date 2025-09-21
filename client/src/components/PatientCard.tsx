// src/components/PatientCard.tsx

import React from "react";
import styles from "../styles/PatientCard.module.css";
import RiskIndicator from "./RiskIndicator";

interface PatientCardProps {
  patient: {
    id: number;
    name: string;
    age: number;
    gender: string;
    cholesterol: number;
    blood_pressure: number;
    bmi: number;
    glucose: number;
    riskLevel?: string; 
    reasons?: string[];
  };
}

const PatientCard: React.FC<{ patient: PatientCardProps["patient"] }> = ({ patient }) => {
  const {
    name,
    age,
    gender,
    cholesterol,
    blood_pressure,
    bmi,
    glucose,
    riskLevel,
    reasons = [],
  } = patient;

  const safeRiskLevel = riskLevel ? riskLevel : "Unknown";

  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Gender:</strong> {gender}</p>
      <p><strong>Cholesterol:</strong> {cholesterol} mg/dL</p>
      <p><strong>Blood Pressure:</strong> {blood_pressure} mmHg</p>
      <p><strong>BMI:</strong> {bmi}</p>
      <p><strong>Glucose:</strong> {glucose} mg/dL</p>

      {/* ✅ unified prop name */}
      <RiskIndicator riskLevel={safeRiskLevel} />

      {reasons.length > 0 && (
        <ul className={styles.reasons}>
          {reasons.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientCard;

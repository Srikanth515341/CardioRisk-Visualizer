// src/components/PatientCard.tsx

import React from "react";
import styles from "../styles/PatientCard.module.css";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  cholesterol: number;
  blood_pressure: number;
  bmi: number;
  glucose: number;
  riskLevel: string;
  reasons: string[];
}

interface Props {
  patient: Patient;
}

const PatientCard: React.FC<Props> = ({ patient }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{patient.name}</h2>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Cholesterol:</strong> {patient.cholesterol} mg/dL</p>
      <p><strong>Blood Pressure:</strong> {patient.blood_pressure} mmHg</p>
      <p><strong>BMI:</strong> {patient.bmi}</p>
      <p><strong>Glucose:</strong> {patient.glucose} mg/dL</p>
      <p className={`${styles.risk} ${styles[patient.riskLevel.toLowerCase()]}`}>
        <strong>Risk Level:</strong> {patient.riskLevel}
      </p>

      {patient.reasons && patient.reasons.length > 0 && (
        <ul className={styles.reasons}>
          {patient.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientCard;

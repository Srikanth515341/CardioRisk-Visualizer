import React from "react";
import styles from "../styles/PatientCard.module.css";
import RiskIndicator from "./RiskIndicator";
import { useTranslation } from "react-i18next";

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

const PatientCard: React.FC<{ patient: PatientCardProps["patient"] }> = ({
  patient,
}) => {
  const { t } = useTranslation();

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
      <p>
        <strong>{t("age")}:</strong> {age}
      </p>
      <p>
        <strong>{t("gender")}:</strong> {gender}
      </p>
      <p>
        <strong>{t("cholesterol")}:</strong> {cholesterol} mg/dL
      </p>
      <p>
        <strong>{t("bloodPressure")}:</strong> {blood_pressure} mmHg
      </p>
      <p>
        <strong>{t("bmi")}:</strong> {bmi}
      </p>
      <p>
        <strong>{t("glucose")}:</strong> {glucose} mg/dL
      </p>

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

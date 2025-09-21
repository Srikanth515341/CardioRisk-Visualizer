// src/components/RiskIndicator.tsx

import React from "react";
import styles from "../styles/RiskIndicator.module.css";

interface RiskIndicatorProps {
  riskLevel?: string; // keep prop name consistent everywhere
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ riskLevel }) => {
  const normalized = riskLevel ? riskLevel.toLowerCase() : "unknown";

  let label = "";
  let colorClass = "";

  switch (normalized) {
    case "high":
      label = "High";
      colorClass = styles.high;
      break;
    case "medium":
      label = "Medium";
      colorClass = styles.medium;
      break;
    case "low":
      label = "Low";
      colorClass = styles.low;
      break;
    default:
      label = "Not Assessed";
      colorClass = styles.unknown;
      break;
  }

  return (
    <div className={`${styles.indicator} ${colorClass}`}>
      {label}
    </div>
  );
};

export default RiskIndicator;

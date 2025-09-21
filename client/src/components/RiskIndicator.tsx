// src/components/RiskIndicator.tsx

import React from "react";
import styles from "../styles/RiskIndicator.module.css";

interface Props {
  riskLevel: string;
}

const RiskIndicator: React.FC<Props> = ({ riskLevel }) => {
  const level = riskLevel.toLowerCase(); // normalize

  return (
    <div className={`${styles.indicator} ${styles[level]}`}>
      {riskLevel}
    </div>
  );
};

export default RiskIndicator;

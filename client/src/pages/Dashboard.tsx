// src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import { getPatients } from "../services/api";
import PatientCard from "../components/PatientCard";
import RiskIndicator from "../components/RiskIndicator";
import CholesterolChart from "../Charts/CholesterolChart";
import BPChart from "../Charts/BPChart";
import BMIChart from "../Charts/BMIChart";
import SimulationPanel from "../components/SimulationPanel"; // ✅ New import
import styles from "../styles/Dashboard.module.css";

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

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading patients...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CardioRisk Visualizer Dashboard</h1>

      {/* ✅ New Simulation Panel */}
      <SimulationPanel />

      <div className={styles.patients}>
        {patients.map((patient) => (
          <div key={patient.id} className={styles.patientWrapper}>
            <PatientCard patient={patient} />
            <RiskIndicator riskLevel={patient.riskLevel} />
          </div>
        ))}
      </div>

      <div className={styles.charts}>
        <CholesterolChart data={patients} />
        <BPChart data={patients} />
        <BMIChart data={patients} />
      </div>
    </div>
  );
};

export default Dashboard;

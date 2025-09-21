// src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import { getPatients } from "../services/api";
import PatientCard from "../components/PatientCard";
import RiskIndicator from "../components/RiskIndicator";
import CholesterolChart from "../Charts/CholesterolChart";
import BPChart from "../Charts/BPChart";
import BMIChart from "../Charts/BMIChart";
import TimelineChart from "../Charts/TimelineChart";
import SimulationPanel from "../components/SimulationPanel";
import { exportToPDF } from "../services/reportService";
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

  // ✅ State for guideline toggle
  const [useOfficialGuidelines, setUseOfficialGuidelines] = useState(true);

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
    <div className={styles.container} id="dashboard-report">
      <h1 className={styles.title}>CardioRisk Visualizer Dashboard</h1>

      {/* Export button */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={() => exportToPDF("dashboard-report")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Export PDF
        </button>
      </div>

      {/* ✅ Guideline Toggle */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Guideline Mode:
        </label>
        <button
          onClick={() => setUseOfficialGuidelines(!useOfficialGuidelines)}
          style={{
            padding: "8px 16px",
            backgroundColor: useOfficialGuidelines ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {useOfficialGuidelines ? "Official Guidelines" : "Custom Guidelines"}
        </button>
      </div>

      {/* What-if Simulation with guideline mode */}
      <SimulationPanel useOfficialGuidelines={useOfficialGuidelines} />

      {/* Patient cards + risk badges */}
      <div className={styles.patients}>
        {patients.map((patient) => (
          <div key={patient.id} className={styles.patientWrapper}>
            <PatientCard patient={patient} />
            <RiskIndicator riskLevel={patient.riskLevel} />
          </div>
        ))}
      </div>

      {/* Summary charts */}
      <div className={styles.charts}>
        <CholesterolChart data={patients} />
        <BPChart data={patients} />
        <BMIChart data={patients} />
      </div>

      {/* Timeline chart */}
      <div style={{ marginTop: 30 }}>
        <TimelineChart />
      </div>
    </div>
  );
};

export default Dashboard;

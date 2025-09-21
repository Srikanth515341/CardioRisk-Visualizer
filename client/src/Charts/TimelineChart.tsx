// src/Charts/TimelineChart.tsx

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TimelineData {
  month: string;
  cholesterol: number;
  blood_pressure: number;
  bmi: number;
  glucose: number;
  cholesterol_pred?: number;
  blood_pressure_pred?: number;
  bmi_pred?: number;
  glucose_pred?: number;
}

const TimelineChart: React.FC = () => {
  const [data, setData] = useState<TimelineData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock historical data
        const history: TimelineData[] = [
          { month: "Jan", cholesterol: 200, blood_pressure: 120, bmi: 25, glucose: 100 },
          { month: "Feb", cholesterol: 210, blood_pressure: 125, bmi: 25.5, glucose: 105 },
          { month: "Mar", cholesterol: 220, blood_pressure: 130, bmi: 26, glucose: 110 },
        ];

        // Fetch predictions from backend
        const response = await fetch("http://localhost:5000/api/patients/1/predict");
        const result = await response.json();

        const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

        const predictions: TimelineData[] = months.map((month, i) => ({
          month,
          cholesterol: NaN,
          blood_pressure: NaN,
          bmi: NaN,
          glucose: NaN,
          cholesterol_pred: result.predictions.cholesterol[i],
          blood_pressure_pred: result.predictions.blood_pressure[i],
          bmi_pred: result.predictions.bmi[i],
          glucose_pred: result.predictions.glucose[i],
        }));

        setData([...history, ...predictions]);
      } catch (err) {
        console.error("Error fetching prediction data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Patient Timeline (History + Prediction)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Historical data (solid lines) */}
          <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="blood_pressure" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="bmi" stroke="#ff7300" strokeWidth={2} />
          <Line type="monotone" dataKey="glucose" stroke="#d62728" strokeWidth={2} />

          {/* Prediction data (dashed lines) */}
          <Line
            type="monotone"
            dataKey="cholesterol_pred"
            stroke="#8884d8"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="blood_pressure_pred"
            stroke="#82ca9d"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="bmi_pred"
            stroke="#ff7300"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="glucose_pred"
            stroke="#d62728"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;

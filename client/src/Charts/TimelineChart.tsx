// src/Charts/TimelineChart.tsx

import React from "react";
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
}

// Mock timeline data (for demo purposes)
const timelineData: TimelineData[] = [
  { month: "Jan", cholesterol: 220, blood_pressure: 130, bmi: 27, glucose: 110 },
  { month: "Feb", cholesterol: 215, blood_pressure: 128, bmi: 26.8, glucose: 108 },
  { month: "Mar", cholesterol: 210, blood_pressure: 126, bmi: 26.5, glucose: 105 },
  { month: "Apr", cholesterol: 205, blood_pressure: 124, bmi: 26.2, glucose: 102 },
  { month: "May", cholesterol: 200, blood_pressure: 122, bmi: 26, glucose: 100 },
  { month: "Jun", cholesterol: 198, blood_pressure: 120, bmi: 25.8, glucose: 99 },
];

const TimelineChart: React.FC = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Patient Timeline (6 Months)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="blood_pressure" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="bmi" stroke="#ff7300" strokeWidth={2} />
          <Line type="monotone" dataKey="glucose" stroke="#d62728" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;

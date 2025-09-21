// src/Charts/BPChart.tsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Patient {
  id: number;
  name: string;
  blood_pressure: number;
}

interface Props {
  data: Patient[];
}

const BPChart: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Blood Pressure</h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "mmHg", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="blood_pressure" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BPChart;

// src/Charts/BMIChart.tsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Patient {
  id: number;
  name: string;
  bmi: number;
}

interface Props {
  data: Patient[];
}

const BMIChart: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>BMI Values</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "BMI", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="bmi" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BMIChart;

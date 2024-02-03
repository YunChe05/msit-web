import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Mood", "Trend"],
  ["Happy", 13],
  ["Sad", 83],
  ["Neutral", 83],
];

export const options = {
  title: "Emotional trend",
  legend: "true",
  pieSliceText: "label",
  is3D: true,
};

export default function App() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"500px"}
    />
  );
}

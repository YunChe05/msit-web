import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Mood", "Trend"],
  ["Happy", 13],
  ["Sad", 83],
  ["Neutral", 83],
];

export const data2 = [
  ["Sad", 0],
  ["Happy", 0],
  ["Neutral", 0],
];

const options = {
  title: "Emotional trend",
  legend: "true",
  pieSliceText: "label",
  is3D: true,
};
export const PieChart = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"500px"}
    />
  );
};

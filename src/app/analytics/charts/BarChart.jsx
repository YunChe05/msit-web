import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Mood", "Happy", "Neutral", "Sad"],
  ["New York City, NY", 8175000, 8008000, 8008000],
  ["Los Angeles, CA", 3792000, 3694000, 3694000],
  ["Chicago, IL", 2695000, 2896000, 3694000],
];

export const options = {
  title: "Population of Largest U.S. Cities",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
};

export const BarChart = () => {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
  );
}
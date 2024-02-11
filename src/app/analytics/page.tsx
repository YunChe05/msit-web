"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import dynamic from "next/dynamic";
import { DatePickerComponent } from "../../../packages/components/DatePickerComponent";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BasicModal } from "../../../packages/components/BasicModal";
import { useMoodCount } from "../../../packages/hooks/useMood";
import { PieChart } from "./charts/PieChart";
import { BarChart } from "./charts/BarChart";
import { Chart } from "react-google-charts";
import { ChartFilterModal } from "../../../packages/components/ChartFilterModal";
import { moods } from "../../../packages/constants/staticMessages";
import { title } from "process";

const options = {
  title: "Emotional trend",
  legend: "true",
  pieSliceText: "label",
  is3D: true,
};
export const data = [
  ["Date", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const lineChartOptions = {
  curveType: "function",
  legend: { position: "bottom" },
};
export default function Analytics() {
  const { pieChart, lineChart } = useMoodCount();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Layout>
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg mb-2">Analytics</h2>
            <Button onClick={handleOpen} variant="outlined">
              Filter
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-gray-700">
              {!!pieChart && (
                <Chart
                  chartType="PieChart"
                  data={[["Mood", "Trend"], ...pieChart]}
                  options={options}
                  width={"100%"}
                  height={"500px"}
                />
              )}
            </div>
            <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-gray-700">
              {!!lineChart && (
                <Chart
                  chartType="LineChart"
                  data={[["Date", ...moods], ...lineChart.data]}
                  options={{
                    ...lineChartOptions,
                    title: `Level of Emotion Trends (${lineChart.dateRange})`,
                  }}
                  width={"100%"}
                  height={"500px"}
                />
              )}
            </div>
          </div>
          <ChartFilterModal isOpen={isOpen} onClose={handleClose} />
        </>
      </Layout>
    </>
  );
}

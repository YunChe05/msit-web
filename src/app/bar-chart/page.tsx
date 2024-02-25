"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import { Button } from "@mui/material";
import { useMoodCount } from "../../../packages/hooks/useMood";
import { Chart } from "react-google-charts";
import { ChartFilterModal } from "../../../packages/components/ChartFilterModal";
import { moods } from "../../../packages/constants/staticMessages";

const lineChartOptions = {
  curveType: "function",
  legend: { position: "bottom" },
};

export default function BarChart() {
  const { lineChart } = useMoodCount();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-end items-center pb-2">
        <Button onClick={handleOpen} variant="outlined">
          Filter
        </Button>
      </div>
      <div className="rounded-lg shadow-lg px-4 py-4 bg-gray-700 w-full">
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
      <ChartFilterModal isOpen={isOpen} onClose={handleClose} />
    </Layout>
  );
}

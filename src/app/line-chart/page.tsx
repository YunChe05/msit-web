"use client";
import React from "react";
import Layout from "../components/layout";
import { useLineChartMoodCount } from "../../../packages/hooks/useMood";
import { Chart } from "react-google-charts";
import { Filters } from "../../../packages/components/FIlters";
import { lineChartFilter } from "../../../packages/atoms/moodAtoms";
import { Typography } from "@mui/material";

const lineChartOptions = {
  curveType: "function",
  legend: { position: "bottom" },
};

export default function LineChart() {
  const { lineChart, moods } = useLineChartMoodCount();

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center pb-2">
        <Typography className="text-center pb-3" variant="h6">
          SENSE: Emotion Trend Line Chart
        </Typography>
        <Filters chartFilter={lineChartFilter} />
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
    </Layout>
  );
}

"use client";
import React from "react";
import Layout from "../components/layout";
import { useLineChartMoodCount } from "../../../packages/hooks/useMood";
import { Chart } from "react-google-charts";
import { moods } from "../../../packages/constants/staticMessages";
import { Filters } from "../../../packages/components/FIlters";
import { lineChartFilter } from "../../../packages/atoms/moodAtoms";

const lineChartOptions = {
  curveType: "function",
  legend: { position: "bottom" },
};

export default function LineChart() {
  const { lineChart } = useLineChartMoodCount();

  return (
    <Layout>
      <div className="flex justify-center items-center pb-2">
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

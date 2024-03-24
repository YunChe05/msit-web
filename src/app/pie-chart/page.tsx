"use client";
import React from "react";
import Layout from "../components/layout";
import { useMoodCount } from "../../../packages/hooks/useMood";
import { Chart } from "react-google-charts";
import { chartFIlter } from "../../../packages/atoms/moodAtoms";
import { Filters } from "../../../packages/components/FIlters";
import { Typography } from "@mui/material";

export default function Analytics() {
  const { pieChart, isDateFiltered, lineChart } = useMoodCount();

  const options = {
    title: `Emotional trend (${isDateFiltered ? lineChart?.dateRange : "All"})`,
    legend: "true",
    pieSliceText: "label",
    is3D: true,
  };
  return (
    <Layout>
      <div className="flex-col justify-center items-center pb-2">
        <Typography className="text-center pb-3" variant="h6">
          SENSE: Emotion Trend Pie Chart
        </Typography>
        <Filters chartFilter={chartFIlter} />
      </div>
      <div className="flex justify-center items-center">
        <div className="rounded-lg shadow-lg px-4 py-4 bg-gray-700 w-full lg:w-[80%] xl:w-[50%]">
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
      </div>
    </Layout>
  );
}

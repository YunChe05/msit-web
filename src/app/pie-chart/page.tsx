"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BasicModal } from "../../../packages/components/BasicModal";
import { useMoodCount } from "../../../packages/hooks/useMood";
import { Chart } from "react-google-charts";
import { ChartFilterModal } from "../../../packages/components/ChartFilterModal";
import { chartFIlter } from "../../../packages/atoms/moodAtoms";
import { Filters } from "../../../packages/components/FIlters";

const options = {
  title: "Emotional trend",
  legend: "true",
  pieSliceText: "label",
  is3D: true,
};

export default function Analytics() {
  const { pieChart } = useMoodCount();

  return (
    <Layout>
      <div className="flex justify-center items-center pb-2">
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

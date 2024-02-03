"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import dynamic from "next/dynamic";
import { DatePickerComponent } from "../../../packages/components/DatePickerComponent";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BasicModal } from "../../../packages/components/BasicModal";
import { useMoodCount } from "../../../packages/hooks/useMood";
import { PieChart, data } from "./charts/PieChart";
import { BarChart } from "./charts/BarChart";
import { Chart } from "react-google-charts";

const options = {
  title: "Emotional trend",
  legend: "true",
  pieSliceText: "label",
  is3D: true,
};
export default function Analytics() {
  const { moodCount } = useMoodCount();
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
              {!!moodCount && (
                <Chart
                  chartType="PieChart"
                  data={[["Mood", "Trend"], ...moodCount]}
                  options={options}
                  width={"100%"}
                  height={"500px"}
                />
              )}
            </div>
            <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-gray-700">
              <BarChart />
            </div>
          </div>
        </>
      </Layout>
      <BasicModal isOpen={isOpen} onClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Filters
        </Typography>
        <div className="flex items-center justify-center">
          <DatePickerComponent />
        </div>
      </BasicModal>
    </>
  );
}

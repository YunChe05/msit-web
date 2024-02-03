"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import dynamic from "next/dynamic";
import { DatePickerComponent } from "../../../packages/components/DatePickerComponent";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BasicModal } from "../../../packages/components/BasicModal";

const PieChart = dynamic(() => import("./charts/pieChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

const BarChart = dynamic(() => import("./charts/barChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});
export default function Analytics() {
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
              <PieChart />
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

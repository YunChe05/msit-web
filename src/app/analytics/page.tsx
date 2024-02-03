"use client";
import React from "react";
import Layout from "../components/layout";
import dynamic from "next/dynamic";
import { DatePickerComponent } from "../../../packages/components/DatePickerComponent";
import { TextField } from "@mui/material";

const PieChart = dynamic(() => import("./charts/pieChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

const GeoChart = dynamic(() => import("./charts/geoChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

const BarChart = dynamic(() => import("./charts/barChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

const AreaChart = dynamic(() => import("./charts/areaChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

const BubbleChart = dynamic(() => import("./charts/BubbleChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

const GanttChart = dynamic(() => import("./charts/ganttChart"), {
  loading: () => <p className="text-white">Chart is Preparing...</p>,
});

export default function Analytics() {
  return (
    <>
      <Layout>
        <>
          <h2 className="text-lg mb-2">Analytics</h2>
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
    </>
  );
}

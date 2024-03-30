"use client";

import { reportFilterAtom } from "../../../packages/atoms/reportAtoms";
import { Filters } from "../../../packages/components/FIlters";
import Layout from "../components/layout";
import { PdfDocument } from "../../../packages/components/PdfDocument";
import { useReports } from "../../../packages/hooks/useMood";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const Reports = () => {
  const { moodData } = useReports();
  return (
    <Layout>
      <Filters chartFilter={reportFilterAtom} />
      <div className="flex flex-col justify-center items-center gap-2">
        {/* <Button variant="outlined">
          {" "}
          <PDFDownloadLink
            document={<PdfDocument data={moodData} />}
            fileName="sense-reports.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download file"
            }
          </PDFDownloadLink>
        </Button> */}
        <PDFViewer className="w-full h-[100dvh]">
          <PdfDocument data={moodData} />
        </PDFViewer>
      </div>
    </Layout>
  );
};

export default Reports;

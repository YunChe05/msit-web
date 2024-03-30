"use client";

import { reportFilterAtom } from "../../../packages/atoms/reportAtoms";
import { Filters } from "../../../packages/components/FIlters";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Layout from "../components/layout";
import { PdfDocument } from "../../../packages/components/PdfDocument";

const Reports = () => {
  return (
    <Layout>
      <Filters chartFilter={reportFilterAtom} />
      <div className="flex justify-center items-center">
        <PDFViewer>
          <PdfDocument />
        </PDFViewer>

        <PDFDownloadLink
          document={<PdfDocument />}
          fileName="sense-reports.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </div>
    </Layout>
  );
};

export default Reports;

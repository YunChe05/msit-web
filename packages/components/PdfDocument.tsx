import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ChartData, LineChart, MoodData } from "../types/mood";
import { parseDate } from "../helper/parseDateTime";
import { useAtomValue } from "jotai";
import { reportFilterAtom } from "../atoms/reportAtoms";

// Create styles
const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignContent: "center",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: "12px",
  },
  header: {
    borderTop: "none",
    backgroundColor: "#6fe1f2",
  },
  bold: {
    fontWeight: "extrabold",
  },
  title: {
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "center",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "20%",
  },
  row2: {
    width: "50%",
  },
});

type PdfDocumentProps = {
  data?: MoodData[];
};

// Create Document Component
export const PdfDocument = ({ data }: PdfDocumentProps) => {
  const title = "Reports";
  return (
    <Document>
      <Page style={{ display: "flex", flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Text>{title}</Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.row1}>Student Id</Text>
            <Text style={styles.row1}>Mood</Text>
            <Text style={styles.row1}>Rate</Text>
            <Text style={styles.row1}>Date</Text>
            <Text style={styles.row1}>Time</Text>
          </View>
          {data &&
            data.map((row, i) => (
              <View key={i} style={styles.row} wrap={false}>
                <Text style={styles.row1}>
                  {row.profile?.studentId || "N/A"}
                </Text>
                <Text style={styles.row1}>{row.mood}</Text>
                <Text style={styles.row1}>{row.rate}</Text>
                <Text style={styles.row1}>{parseDate(row.createdAt)}</Text>
                <Text style={styles.row1}>
                  {parseDate(row.createdAt, "H:mm")}
                </Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

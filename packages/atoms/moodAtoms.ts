import { atomWithQuery } from "jotai-tanstack-query";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { MakePayload } from "../types/helperType";
import { atom } from "jotai";
import { ChartData, FiltersType } from "../types/mood";

export const chartFIlter = atom<FiltersType>({
  start_date: "",
  end_date: "",
  course: { id: -1, name: "" },
  college: { id: -1, name: "" },
  selectedMood: "All",
});

export const lineChartFilter = atom<FiltersType>({
  start_date: "",
  end_date: "",
  course: { id: -1, name: "" },
  college: { id: -1, name: "" },
  selectedMood: "All",
});

export const moodCountAtom = atomWithQuery((get) => ({
  queryKey: ["moodCount", get(chartFIlter)],
  queryFn: async () => {
    const { college, course, end_date, start_date, selectedMood, studentId } =
      get(chartFIlter);
    try {
      const { data } = await makeRequest.get<ChartData>("/user-mood/count", {
        params: {
          start_date,
          end_date,
          college: college.id,
          course: course.id,
          selectedMood,
          studentId,
        },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));

export const lineMoodCountAtom = atomWithQuery((get) => ({
  queryKey: ["lineMoodCount", get(lineChartFilter)],
  queryFn: async () => {
    const { college, course, end_date, start_date, selectedMood, studentId } =
      get(lineChartFilter);
    try {
      const { data } = await makeRequest.get<ChartData>("/user-mood/count", {
        params: {
          start_date,
          end_date,
          college: college.id,
          course: course.id,
          selectedMood,
          studentId,
        },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));

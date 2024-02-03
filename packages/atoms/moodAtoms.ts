import { atomWithQuery } from "jotai-tanstack-query";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { MakePayload } from "../types/helperType";
import { MoodCount } from "../types/mood";
import { atom } from "jotai";

export const chartFIlter = atom({
  start_date: "",
  end_date: "",
  course: { id: -1, name: "" },
  college: { id: -1, name: "" },
});

export const moodCountAtom = atomWithQuery((get) => ({
  queryKey: ["moodCount", get(chartFIlter)],
  queryFn: async () => {
    const { college, course, end_date, start_date } = get(chartFIlter);
    try {
      const { data } = await makeRequest.get<MoodCount>("/user-mood/count", {
        params: {
          start_date,
          end_date,
          college: college.id,
          course: course.id,
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

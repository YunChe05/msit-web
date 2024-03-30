import { atom } from "jotai";
import { ChartData, FiltersType, MoodData, MoodWithMeta } from "../types/mood";
import { atomWithQuery } from "jotai-tanstack-query";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { MakePayload } from "../types/helperType";
import { moodFilterQuery } from "../helper/moodFilterQuery";

export const reportFilterAtom = atom<FiltersType>({
  start_date: "",
  end_date: "",
  course: { id: -1, name: "" },
  college: { id: -1, name: "" },
  selectedMood: "All",
});

export const reportsAtom = atomWithQuery((get) => ({
  queryKey: ["reportsAtom", get(reportFilterAtom)],
  queryFn: async () => {
    const filters = moodFilterQuery(get(reportFilterAtom));
    try {
      const { data } = await makeRequest.get<MoodWithMeta>("/user-moods", {
        params: {
          populate: "deep",
          filters,
          sort: "id:desc",
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

import { atomWithQuery } from "jotai-tanstack-query";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { MakePayload } from "../types/helperType";
import { MoodCount } from "../types/mood";
import { atom } from "jotai";

export const chartFIlter = atom({
  start_date: "",
  end_date: "",
  course: -1,
  college: -1,
});

export const moodCountAtom = atomWithQuery((get) => ({
  queryKey: ["moodCount"],
  queryFn: async () => {
    try {
      const { data } = await makeRequest.get<MoodCount>("/user-mood/count", {
        // params: {
        //   start_date: "2024-02-01",
        //   end_date: "2024-02-04",
        //   course: 3,
        //   college: 2,
        // },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));

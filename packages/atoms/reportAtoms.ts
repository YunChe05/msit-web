import { atom } from "jotai";
import { FiltersType } from "../types/mood";

export const reportFilterAtom = atom<FiltersType>({
  start_date: "",
  end_date: "",
  course: { id: -1, name: "" },
  college: { id: -1, name: "" },
  selectedMood: "All",
});

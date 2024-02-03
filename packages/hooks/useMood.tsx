import { useAtomValue } from "jotai";
import { moodCountAtom } from "../atoms/moodAtoms";
import { MoodCount } from "../types/mood";

export const useMoodCount = () => {
  const { data, isLoading } = useAtomValue(moodCountAtom);

  return { moodCount: data as MoodCount, isLoading };
};

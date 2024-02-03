import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { chartFIlter, moodCountAtom } from "../atoms/moodAtoms";
import { MoodCount } from "../types/mood";
import { parseDate, parseDateType } from "../helper/parseDateTime";
import { collegeAtom } from "../atoms/studentAtoms";
import { College } from "../types/user";

export const getCourses = (
  colleges: College[] | undefined,
  selectedCollege: number
) => {
  return (
    colleges?.find((college) => college.id === selectedCollege)?.courses || []
  );
};
export const useMoodCount = () => {
  const { data, isLoading } = useAtomValue(moodCountAtom);

  return { moodCount: data as MoodCount, isLoading };
};

export const useMoodFilter = () => {
  const [moodFilter, setMoodFilter] = useAtom(chartFIlter);
  const { data: colleges, isLoading: isCollegeLoading } =
    useAtomValue(collegeAtom);

  const courses = getCourses(colleges, moodFilter.college.id);

  const setCollegeId = (id: number, name: string) => {
    setMoodFilter((prev) => {
      return {
        ...prev,
        college: { id, name },
      };
    });
  };

  const setCourseId = (id: number, name: string) => {
    setMoodFilter((prev) => {
      return {
        ...prev,
        course: { id, name },
      };
    });
  };

  const setDateRange = (date: { startDate: Date; endDate: Date }) => {
    setMoodFilter((prev) => {
      return {
        ...prev,
        start_date: parseDateType(date.startDate),
        end_date: parseDateType(date.endDate),
      };
    });
  };

  return {
    collegeData: colleges as College[] | undefined,
    courses,
    moodFilter,
    isCollegeLoading,
    setDateRange,
    setCollegeId,
    setCourseId,
    setMoodFilter,
  };
};

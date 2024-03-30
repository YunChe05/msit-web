import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  chartFIlter,
  lineMoodCountAtom,
  moodCountAtom,
} from "../atoms/moodAtoms";
import { parseDate, parseDateType } from "../helper/parseDateTime";
import { collegeAtom } from "../atoms/studentAtoms";
import { College } from "../types/user";
import { FiltersType, Moods } from "../types/mood";
import { reportsAtom } from "../atoms/reportAtoms";

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
  return {
    pieChart: data?.pieChart,
    lineChart: data?.lineChart,
    isLoading,
    moods: data?.moods || [],
    isDateFiltered: !!data?.isDateFiltered,
  };
};

export const useLineChartMoodCount = () => {
  const { data, isLoading } = useAtomValue(lineMoodCountAtom);
  return {
    pieChart: data?.pieChart,
    lineChart: data?.lineChart,
    isLoading,
    moods: data?.moods || [],
    isDateFiltered: !!data?.isDateFiltered,
  };
};

export const useReports = () => {
  const { data, isLoading } = useAtomValue(reportsAtom);
  const { data: moodData, meta } = data || {};
  return {
    moodData,
  };
};

export const useMoodFilter = (chartFilter: PrimitiveAtom<FiltersType>) => {
  const [moodFilter, setMoodFilter] = useAtom(chartFilter);
  const { colleges, isCollegeLoading } = useGetColleges();

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

  const setStudentId = (text: string) => {
    setMoodFilter((prev) => ({ ...prev, studentId: text }));
  };

  const setMood = (mood: Moods) => {
    setMoodFilter((prev) => ({ ...prev, selectedMood: mood }));
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
    setMood,
    setStudentId,
  };
};

export const useGetColleges = () => {
  const { data: colleges, isLoading: isCollegeLoading } =
    useAtomValue(collegeAtom);

  return { colleges, isCollegeLoading };
};

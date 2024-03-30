import { MakePayload } from "./helperType";
import { PaginationMeta, Profile } from "./user";

export type ChartData = {
  moods: string[];
  isDateFiltered: boolean;
  pieChart: [string, number][];
  lineChart: LineChart;
};

export type LineChart = {
  dateRange: string;
  data: [string, number, number, number, number, number, number, number][];
};

export type FiltersType = {
  start_date: string;
  end_date: string;
  course: { id: number; name: string };
  college: { id: number; name: string };
  studentId?: string;
  selectedMood?: Moods;
};

export type MoodEnum =
  | "All"
  | "Happy"
  | "Sad"
  | "Content"
  | "Angry"
  | "Upset"
  | "Relaxed";

export type Moods = `${MoodEnum}`;

export type MoodData = {
  id: number;
  rate: number;
  remarks: string | null;
  mood: Moods;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
};

export type MoodWithMeta = MakePayload<MoodData[]> & {
  meta: PaginationMeta;
};

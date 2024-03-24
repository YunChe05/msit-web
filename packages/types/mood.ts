export type ChartData = {
  moods: string[];
  isDateFiltered: boolean;
  pieChart: [string, number][];
  lineChart: {
    dateRange: string;
    data: [string, number, number, number, number, number, number][];
  };
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

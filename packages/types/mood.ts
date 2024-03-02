type ChartData = {
  pieChart: [string, number][];
  lineChart: {
    dateRange: string;
    data: [string, number, number, number, number, number, number][];
  };
};

type Filters = {
  start_date: string;
  end_date: string;
  course: { id: number; name: string };
  college: { id: number; name: string };
};

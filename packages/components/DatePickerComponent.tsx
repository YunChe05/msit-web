import { RangePicker } from "react-typescript-date-picker";

type DatePickerComponent = {
  startDate: string;
  endDate: string;
  onChange: () => void;
};
export const DatePickerComponent = ({
  startDate,
  // endDate,
  onChange,
}: DatePickerComponent) => {
  const currentDate = new Date("2024-01-08");
  const endDate = new Date();
  return (
    <RangePicker
      defaultStartDate={currentDate}
      defaultEndDate={endDate}
      onChange={onChange}
      size="small"
    />
  );
};

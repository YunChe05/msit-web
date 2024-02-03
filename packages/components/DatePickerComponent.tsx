import { RangePicker } from "react-typescript-date-picker";

type DatePickerComponent = {
  onChange: () => void;
};
export const DatePickerComponent = ({
  // startDate,
  // endDate,
  onChange,
}: DatePickerComponent) => {
  const startDate = new Date();
  return (
    <RangePicker
      defaultStartDate={startDate}
      onChange={onChange}
      size="large"
    />
  );
};

import { RangePicker } from "react-typescript-date-picker";
import { convertTextDateToJavaScriptDate } from "../helper/parseDateTime";

type DatePickerComponent = {
  startDate: string;
  endDate: string;
  onChange: (date: { startDate: Date; endDate: Date }) => void;
};
export const DatePickerComponent = ({
  onChange,
  endDate,
  startDate,
}: DatePickerComponent) => {
  const [sd, ed] = convertTextDateToJavaScriptDate(startDate, endDate);

  return (
    <RangePicker startDate={sd} endDate={ed} onChange={onChange} size="large" />
  );
};

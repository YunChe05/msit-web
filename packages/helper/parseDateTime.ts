import dayjs, { Dayjs } from "dayjs";

const defaultDateTemplate = "YYYY-MM-DD";

export const getDateToday = (template?: string) => {
  return dayjs().format(template ?? defaultDateTemplate);
};

export const parseDate = (date: string, template?: string) => {
  return dayjs(date).format(template ?? defaultDateTemplate);
};

export const parseDateType = (date: Date, template?: string) => {
  return dayjs(date).format(template ?? defaultDateTemplate);
};

export const convertTextDateToJavaScriptDate = (
  start_date: string,
  end_date: string
): Date[] | undefined[] => {
  if (
    start_date.length === 0 ||
    end_date.length === 0 ||
    end_date === "Invalid Date"
  ) {
    return [undefined, undefined];
  }
  const parsedStartDate = dayjs(start_date);
  const parsedEndDate = dayjs(end_date);
  return [parsedStartDate.toDate(), parsedEndDate.toDate()];
};

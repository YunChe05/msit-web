import dayjs, { Dayjs } from "dayjs";

const defaultDateTemplate = "YYYY-MM-DD";

export const getDateToday = (template?: string) => {
  return dayjs().format(template ?? defaultDateTemplate);
};

export const parseDate = (date: string, template?: string) => {
  return dayjs(date).format(template ?? defaultDateTemplate);
};

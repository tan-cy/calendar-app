export const monthsWithDays: MonthData[] = [
  { id: 1, month: 'January', day: 31 },
  { id: 2, month: 'February', day: 28 },
  { id: 3, month: 'March', day: 31 },
  { id: 4, month: 'April', day: 30 },
  { id: 5, month: 'May', day: 31 },
  { id: 6, month: 'June', day: 30 },
  { id: 7, month: 'July', day: 31 },
  { id: 8, month: 'August', day: 31 },
  { id: 9, month: 'September', day: 30 },
  { id: 10, month: 'October', day: 31 },
  { id: 11, month: 'November', day: 30 },
  { id: 12, month: 'December', day: 31 },
];
export const weekdays: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export type CalendarDate = {
  weekday: string;
  month: string;
  day: number;
  year: number;
};

export type MonthData = {
  id: number;
  month: string;
  day: number;
};

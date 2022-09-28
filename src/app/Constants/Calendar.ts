export const MONTHS_WITH_DAYS: MonthData[] = [
  { id: 1, month: 'January', daysInMonth: 31 },
  { id: 2, month: 'February', daysInMonth: 28 },
  { id: 3, month: 'March', daysInMonth: 31 },
  { id: 4, month: 'April', daysInMonth: 30 },
  { id: 5, month: 'May', daysInMonth: 31 },
  { id: 6, month: 'June', daysInMonth: 30 },
  { id: 7, month: 'July', daysInMonth: 31 },
  { id: 8, month: 'August', daysInMonth: 31 },
  { id: 9, month: 'September', daysInMonth: 30 },
  { id: 10, month: 'October', daysInMonth: 31 },
  { id: 11, month: 'November', daysInMonth: 30 },
  { id: 12, month: 'December', daysInMonth: 31 },
];

export const WEEKDAYS: Weekday[] = [
  { id: 0, day: 'Sunday' },
  { id: 1, day: 'Monday' },
  { id: 2, day: 'Tuesday' },
  { id: 3, day: 'Wednesday' },
  { id: 4, day: 'Thursday' },
  { id: 5, day: 'Friday' },
  { id: 6, day: 'Saturday' },
];

export type CalendarDate = {
  weekday: Weekday;
  month: MonthData;
  day: number;
  year: number;
};

export type MonthData = {
  id: number;
  month: string;
  daysInMonth: number;
  daysArray?: number[];
};

export type Weekday = { id: number; day: string };

export const MAX_MONTH_IDX = 11;
export const MIN_MONTH_IDX = 0;

export enum CalendarView {
  DAY_VIEW = 'Day',
  WEEK_VIEW = 'Week',
  MONTH_VIEW = 'Month',
}

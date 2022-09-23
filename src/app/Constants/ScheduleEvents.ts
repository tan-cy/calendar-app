export type EventToSchedule = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  timezoneOffset: number;
};

export const defaultEventToSchedule = {
  id: 0,
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  timezoneOffset: 0,
};

export const NO_ERRORS = 'Event submitted without errors.';
export const ERROR_EVENT_EMPTY =
  'Something has gone wrong in schedule-day component. EventToSchedule object is empty.';
export const ERROR_EMPTY_DATE = 'Cannot leave date empty.';
export const ERROR_EMPTY_TITLE = 'Cannot leave title empty.';
export const ERROR_EMPTY_TIME = 'Cannot leave time empty.';
export const ERROR_SUBMIT_FAILED =
  'Something has gone wrong in schedule-day component. Submitting the event has failed.';

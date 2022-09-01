export type EventToSchedule = {
  id: number;
  title: string;
  date: Date;
  time: Date;
  description: string;
};

export const defaultEventToSchedule = {
  id: 0,
  title: '',
  date: new Date(),
  time: new Date(),
  description: '',
};

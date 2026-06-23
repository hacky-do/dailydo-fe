import { differenceInCalendarDays } from 'date-fns';

export const daysSince = (dateStr: string): number =>
  differenceInCalendarDays(new Date(), new Date(dateStr)) + 1;

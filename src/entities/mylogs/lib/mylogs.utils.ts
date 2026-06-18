import { format, isValid, parseISO } from 'date-fns';

import { DATE_REGEX, MONTH_REGEX } from '../model/mylogs.constants';

const isValidCalendarDate = (date: string): boolean => {
  if (!DATE_REGEX.test(date)) return false;
  const parsed = parseISO(date);
  return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === date;
};

export const resolveInitialDate = (date?: string): string =>
  date && isValidCalendarDate(date) ? date : format(new Date(), 'yyyy-MM-dd');

export const resolveInitialMonth = (month?: string): string =>
  month && MONTH_REGEX.test(month) ? month : format(new Date(), 'yyyy-MM');

import { format } from 'date-fns';

export const formatDaylogTime = (dateStr: string) =>
  format(new Date(dateStr), 'HH:mm');

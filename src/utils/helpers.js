import {DateTime} from 'luxon';

export const sameDate = (
  date1 = DateTime.local(),
  date2 = DateTime.local(),
) => {
  return (
    date1.year === date2.year &&
    date1.month === date2.month &&
    date1.day === date2.day
  );
};

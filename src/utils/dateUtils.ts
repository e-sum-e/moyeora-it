import { format } from 'date-fns';

/** 날짜를 0000.00.00 형태로 반환하는 함수 */
export const getYearMonthDayWithDot = (date: Date) => {
  return format(date, 'yyyy.MM.dd');
};

import { format, isBefore } from 'date-fns';

/** 날짜를 0000.00.00 형태로 반환하는 함수 */
export const getYearMonthDayWithDot = (date: Date) => {
  return format(date, 'yyyy.MM.dd');
};

/** 현재 날짜보다 이전날짜인지 확인 */
export const isBeforeToday = (date: Date) => {
  const now = new Date(); // 현재 시각 포함
  return isBefore(date, now);
};
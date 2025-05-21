import { useCallback, useEffect, useRef } from 'react';

// 더블클릭 방지 - 디바운스 사용
const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};
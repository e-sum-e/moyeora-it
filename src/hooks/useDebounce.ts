import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timerRef = useRef<number | null>(null);

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

      timerRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};

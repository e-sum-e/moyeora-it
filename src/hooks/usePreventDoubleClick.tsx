import { useRef, useCallback } from 'react';

export const usePreventDoubleClick = (
  callback: () => void,
  threshold: number = 300,
) => {
  const lastClickTimeRef = useRef(0);

  const handleClick = useCallback(() => {
    const now = Date.now();

    if (now - lastClickTimeRef.current > threshold) {
      callback();
      lastClickTimeRef.current = now;
    }
  }, [callback, threshold]);

  return handleClick;
};

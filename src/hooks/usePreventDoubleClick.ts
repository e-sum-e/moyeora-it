import { useRef } from "react";

export const usePreventDoubleClick = (delay: number = 500) => {
  const lastClickTimeRef = useRef<number>(0);
  const isWaitingRef = useRef<boolean>(false);

  const preventDoubleClick = async (callback: () => void | Promise<void>) => {
    const now = Date.now();

    if (now - lastClickTimeRef.current > delay && !isWaitingRef.current) {
      lastClickTimeRef.current = now;
      isWaitingRef.current = true;

      try {
        await callback();
      } finally {
        setTimeout(() => {
          isWaitingRef.current = false;
        }, delay);
      }
    }
  };

  return preventDoubleClick;
};

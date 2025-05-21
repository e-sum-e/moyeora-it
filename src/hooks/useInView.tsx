import { useEffect, useRef } from 'react';

/**
 * 요소가 화면에 보이는지 확인하는 훅
 * @param callback 요소가 화면에 보이면 실행할 콜백 함수
 * @param options  IntersectionObserverInit 옵션
 * @returns 관찰할 dom 요소
 */
export const useInView = <T extends HTMLElement>(
  callback: () => Promise<void> | void,
  options: IntersectionObserverInit = { threshold: 0.1 },
) => {
  const ref = useRef<T>(null);
  const callbackRef = useRef(callback);
  const isIntersectingRef = useRef(false);

  // 항상 최신 callback을 참조하도록 유지
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(async ([entries]) => {
      if (entries.isIntersecting) {
        if (!isIntersectingRef.current) {
          isIntersectingRef.current = true;
          await callbackRef.current();
        }
      } else {
        isIntersectingRef.current = false;
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return ref;
};

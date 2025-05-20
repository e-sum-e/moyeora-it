import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 클라이언트 환경에서만 IntersectionObserver 생성
    if (typeof window !== 'undefined') {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
            }
          });
        },
        { threshold: 1 },
      );
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [callback]);

  const observe = (element: HTMLElement) => {
    if (observer.current) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element: HTMLElement) => {
    if (observer.current) {
      observer.current.unobserve(element);
    }
  };

  return [observe, unobserve] as const;
}

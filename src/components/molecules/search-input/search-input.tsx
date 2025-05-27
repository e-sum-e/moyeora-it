'use client';

import { ComponentProps, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';

/**
 * 사용자 이름, 모임 명을 검색하기 위한 컴포넌트
 *
 * @param props 기본 input 요소의 props
 * @returns 검색 인풋 컴포넌트
 */
export const SearchInput = (props: ComponentProps<'input'>) => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  // q 쿼리 파라미터가 변경되면, 인풋 요소의 값을 변경한다.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchParams.get('q') ?? '';
    }
  }, [searchParams]);

  /**
   * 엔터 키가 눌리면, 쿼리 파라미터가 변경된 페이지로 이동한다.
   * 
   * 인풋 요소의 값이 빈 문자열인 경우, q 쿼리 파라미터를 삭제한다.
   * 인풋 요소의 값이 빈 문자열이 아닌 경우, q 쿼리 파라미터 값을 변경한다.
   *
   * @param e keyDown 이벤트
   */
  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      if (inputRef.current) {
        const queryParams = new URLSearchParams(searchParams);
        const q = inputRef.current.value;
        if (q) {
          queryParams.set('q', q);
        } else {
          queryParams.delete('q');
        }
        router.push(`${pathname}?${queryParams.toString()}`);
      }
    }
  };

  return <Input {...props} onKeyDown={keyDownHandler} ref={inputRef} />;
};

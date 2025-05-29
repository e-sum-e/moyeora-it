'use client';

import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';

/**
 * 사용자 이름, 모임 명을 검색하기 위한 컴포넌트
 *
 * @param props 기본 input 요소의 props
 * @returns 검색 인풋 컴포넌트
 */

type SearchInputProps = {
  setSearchKeyword: (searchKeyword: string) => void;
  selectSearchKeyword: (searchKeyword: string) => void;
} & ComponentProps<'input'>;

export const SearchInput = ({
  setSearchKeyword,
  selectSearchKeyword,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchKeyword = searchParams.get('search');

    if (searchKeyword) {
      setSearchKeyword(searchKeyword);
    }
    // 초기 1회만 실행하도록 deps는 빈배열로 둠
    // eslint-disable-next-line
  }, []);

  /**
   * 엔터 키가 눌리면, 입력값으로 검색되며 쿼리 파라미터가 변경된다(updateQuery)
   *
   * @param e keyDown 이벤트
   */
  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      selectSearchKeyword(value);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={keyDownHandler}
    />
  );
};

'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { SearchInput } from '@/components/molecules/search-input/search-input';

/**
 * 모임 목록 필터 컴포넌트
 * 
 * 사용자의 참가/모집 중인 모임 목록을 필터링한다.
 *
 * @returns 모임 목록 필터 컴포넌트
 */
export const GroupFilter = () => {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const type = searchParams.get('type') ?? 'project';
  const sort = searchParams.get('sort');
  const status = searchParams.get('status') ?? 'RECRUITING';

  /**
   * 필터 아이템 클릭 핸들러
   *
   * 만약, 매개변수로 전달된 필터 키가 쿼리 스트링에 존재하고, 값이 매개변수로 전달된 필터 값과 동일하다면, 종료한다.
   * 만약, 매개변수로 전달된 필터 값이 'PARTICIPATING'이라면, sort 쿼리 파라미터를 삭제한다.
   * 
   * @param key 필터 키
   * @param value 필터 값
   */
  const filterItemClickHandler = (key: string, value: string) => {
    const queryParams = new URLSearchParams(searchParams);
    if (queryParams.has(key) && queryParams.get(key) === value) return;
    if (value === 'PARTICIPATING') {
      queryParams.delete('sort');
    }
    queryParams.set(key, value);
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  /**
   * 정렬 선택 핸들러
   *
   * 만약, sort 쿼리 파라미터가 이미 존재하고, 값이 매개변수로 전달된 정렬 값과 동일하다면, 종료한다.
   * 그 외, sort 쿼리 파라미터의 값을 매개변수로 전달된 정렬 값으로 설정한다.
   * 
   * @param value 정렬 값
   */
  const sortSelectChangeHandler = (value: string) => {
    const queryParams = new URLSearchParams(searchParams);
    if (queryParams.has('sort') && queryParams.get('sort') === value) return;

    queryParams.set('sort', value);
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <ul className="flex gap-x-2">
          {[
            {
              label: '프로젝트',
              value: 'project',
            },
            {
              label: '스터디',
              value: 'study',
            },
          ].map((item) => (
            <li key={item.value}>
              <Link href={`${pathname}?type=${item.value}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <SearchInput
          className="w-64"
          placeholder={`${type === 'project' ? '프로젝트 검색' : '스터디 검색'}`}
        />
      </div>
      <div className="flex justify-between">
        <ul className="flex gap-x-2">
          {[
            {
              label: '모집중',
              value: 'RECRUITING',
            },
            {
              label: '참여중',
              value: 'PARTICIPATING',
            },
          ].map((item) => (
            <li
              key={item.value}
              onClick={() => filterItemClickHandler('status', item.value)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        {status === 'RECRUITING' && (
          <div>
            <Select
              defaultValue={sort ?? 'deadline'}
              onValueChange={sortSelectChangeHandler}
            >
              <SelectTrigger>
                <SelectValue placeholder="마감일 순" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem defaultChecked value="deadline">
                    마감일 순
                  </SelectItem>
                  <SelectItem value="created">작성일 순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

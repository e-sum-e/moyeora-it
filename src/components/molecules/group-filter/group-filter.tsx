'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import Image from 'next/image';

/**
 * 모임 목록 필터 컴포넌트
 *
 * 사용자의 참가/모집 중인 모임 목록을 필터링한다.
 *
 * @returns 모임 목록 필터 컴포넌트
 */
export const GroupFilter = () => {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const type = searchParams.get('type') ?? 'study';

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <ul className="flex gap-x-2 items-center">
          {[
            {
              label: '스터디',
              value: 'study',
            },
            {
              label: '프로젝트',
              value: 'project',
            },
          ].map((item) => (
            <li key={item.value}>
              <Link
                className={`shrink-0 ${type === item.value ? 'text-gray-900' : 'text-gray-400'} font-semibold`}
                href={`${pathname}?type=${item.value}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <SearchInput
          containerClassName="w-[150px] md:w-[200px]"
          placeholder="검색"
        />
      </div>
    </div>
  );
};

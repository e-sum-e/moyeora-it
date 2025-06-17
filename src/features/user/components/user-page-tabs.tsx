'use client';

import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

export const UserPageTabs = () => {
  const { id } = useParams<{ id: string }>();

  const pathname = usePathname();

  return (
    <ul className="flex gap-3 mx-4">
      {[
        { label: '팔로잉', href: `/users/${id}/followings` },
        { label: '팔로워', href: `/users/${id}/followers` },
        { label: '개설한 모임', href: `/users/${id}/groups/created` },
        { label: '종료된 모임', href: `/users/${id}/groups/ended` },
      ].map(({ label, href }) => (
        <li className="relative" key={label}>
          <Link
            className={`text-lg font-semibold ${pathname === href ? 'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gray-900' : 'text-gray-400'}`}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

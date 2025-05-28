'use client';

import { useParams } from 'next/navigation';

import Link from 'next/link';

export const UserPageTabs = () => {
  const { id } = useParams();

  return (
    <ul className="flex gap-4">
      {[
        { label: '팔로잉', href: `/user/${id}/followings` },
        { label: '팔로워', href: `/user/${id}/followers` },
        { label: '모임', href: `/user/${id}/groups` },
      ].map(({ label, href }) => (
        <li key={label}>
          <Link className="text-xl" href={href}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

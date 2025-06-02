'use client';

import { useParams } from 'next/navigation';

import Link from 'next/link';

export const UserPageTabs = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ul className="flex gap-4">
      {[
        { label: '팔로잉', href: `/users/${id}/followings` },
        { label: '팔로워', href: `/users/${id}/followers` },
        { label: '모임', href: `/users/${id}/groups` },
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

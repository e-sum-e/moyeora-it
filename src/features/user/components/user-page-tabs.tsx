import Link from 'next/link';

export const UserPageTabs = () => {
  return (
    <ul className="flex gap-4">
      {[
        { label: '팔로잉', href: '/mypage/followings' },
        { label: '팔로워', href: '/mypage/followers' },
        { label: '모임', href: '/mypage/meetings' },
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

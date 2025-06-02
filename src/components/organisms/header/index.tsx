'use client';

import useAuthStore from '@/stores/useAuthStore';
import Link from 'next/link';
import { NotificationList } from '@/components/molecules/notification-list';
  
const menuItems = [
    {
      label: '모여라-IT',
      href: '/',
    },
    {
      label: 'Bookmark',
      href: '/bookmark',
    },
  ];

const loggedOutMenuItems = [
  {
    label: 'Login',
    href: '/login',
  },
];

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = Boolean(user);
  
  const loggedInMenuItems = [
    {
      label: 'MyPage',
      href: `/users/${user?.userId}`,
    },
    {
      label: 'Notification',
      href: '/notification',
    },
  ];

  const displayMenuItems = [
    ...menuItems,
    ...(isLoggedIn ? loggedInMenuItems : loggedOutMenuItems),
  ];

  return (
    <header>
      <nav>
        <ul className="flex gap-4 w-full justify-between">
          {displayMenuItems.map((item) => (
            <li key={item.href}>
              {item.href === '/' ? (
                <h1>
                  <Link href={item.href}>{item.label}</Link>
                </h1>
              ) : isLoggedIn && item.label === 'Notification' ? (
                 <NotificationList />
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

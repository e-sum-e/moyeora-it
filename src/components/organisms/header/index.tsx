'use client';

import useAuthStore from '@/stores/useAuthStore';
import {Notification} from '@/components/molecules/notification';
import Link from 'next/link';
import React, { useMemo } from 'react';

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

const loggedInMenuItems = [
  {
    label: 'MyPage',
    href: '/mypage',
  },
  {
    label: 'Notification',
    href: '/notification',
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
  const isLoggedIn = useMemo(() => Boolean(user), [user]);
  
  const displayMenuItems = useMemo(() => [
    ...menuItems,
    ...(isLoggedIn ? loggedInMenuItems : loggedOutMenuItems),
  ], [isLoggedIn]);

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
                 <Notification />
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

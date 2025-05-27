'use client';

// import useAuthStore from '@/stores/useAuthStore';
import { NotificationBadge } from '@/components/molecules/notification-badge';
import Link from 'next/link';
import React, { useRef } from 'react';
import useNotificationStore from '@/stores/useNotificationStore';
import { NotificationList } from '@/components/molecules/notification-list';

export const Header = () => {
  // const user = useAuthStore((state) => state.user);
  const user = {
    id: '1',
    name: '홍길동',
    email: 'test@test.com',
    profileImage: 'https://github.com/shadcn.png',
  }
  
  
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

  const isLoggedIn = useRef(user ? true : false);
  
  const displayMenuItems = [
    ...menuItems,
    ...(isLoggedIn.current ? loggedInMenuItems : loggedOutMenuItems),
  ];
  

  const { hasUnreadNotification } = useNotificationStore();

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
              ) : isLoggedIn.current && item.label === 'Notification' ? (
                <div className='relative'>
                  <NotificationList />
                  {hasUnreadNotification && <NotificationBadge />}
                </div>
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

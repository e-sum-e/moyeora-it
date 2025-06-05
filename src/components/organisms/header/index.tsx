'use client';

import useAuthStore from '@/stores/useAuthStore';
import Link from 'next/link';
import { NotificationList } from '@/components/molecules/notification-list';
import { ErrorBoundary } from '@/components/error-boundary';
import { handleError } from '@/components/error-boundary/error-handler';

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
                <ErrorBoundary                  
                  fallback={({ error, resetErrorBoundary }) => 
                    handleError({ 
                      error, 
                      resetErrorBoundary,
                      defaultMessage: '알림을 불러오는 중 문제가 발생했습니다'
                    })
                  }
                >
                  <NotificationList />
                </ErrorBoundary>
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

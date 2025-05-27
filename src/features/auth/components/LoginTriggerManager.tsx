'use client';

import { useEffect } from 'react';

type TriggerManagerProps = {
  prevPathname: string;
};

const LoginTriggerManager = ({ prevPathname }: TriggerManagerProps) => {
  useEffect(() => {
    // 인증 페이지들 사이에서 이동하는 경우 저장하지 않도록 처리!!!!!!!!!!!!!!!
    if (
      prevPathname === '/login' ||
      prevPathname === '/register' ||
      prevPathname === '/find-email' ||
      prevPathname === '/find-password'
    ) {
      return;
    }

    localStorage.setItem('login-trigger-path', prevPathname);
  }, []);

  return null;
};

export default LoginTriggerManager;

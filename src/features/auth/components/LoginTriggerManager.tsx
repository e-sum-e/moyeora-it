'use client';

import { useEffect } from 'react';

type TriggerManagerProps = {
  prevPathname: string;
};

const LoginTriggerManager = ({ prevPathname }: TriggerManagerProps) => {
  useEffect(() => {
    localStorage.setItem('login-trigger-path', prevPathname);
  }, []);

  return null;
};

export default LoginTriggerManager;

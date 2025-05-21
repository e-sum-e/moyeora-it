'use client';

import Link from 'next/link';
import LoginForm from '@/components/organisms/login-form';

export default function Page() {
  return (
    <div>
      <LoginForm />
      <div className="flex flex-col">
        <Link href="/register">회원가입</Link>
        <Link href="/find-email">이메일 찾기</Link>
        <Link href="/reset-password">비밀번호 찾기</Link>
      </div>
    </div>
  );
}

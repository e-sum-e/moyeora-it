'use client';

import Link from 'next/link';
import FindPassword from '@/components/organisms/find-password-form';

export default function Page() {
  return (
    <>
      <div>
        <FindPassword />
        <Link href="/login">로그인으로 돌아가기</Link>
      </div>
    </>
  );
}

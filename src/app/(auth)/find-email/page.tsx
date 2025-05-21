'use client';

import Link from 'next/link';
import FindEmailForm from '@/components/organisms/find-email-form';

export default function Page() {
  return (
    <div>
      <FindEmailForm isResetPassword={false} />
      <Link href="/login">로그인으로 돌아가기</Link>
    </div>
  );
}

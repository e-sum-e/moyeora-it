'use client';

import Link from 'next/link';
import FindEmailForm from '@/components/organisms/find-email-form';
import ClientAuthGuard from '@/features/auth/components/ClientAuthGuard';

export default function Page() {
  return (
    <ClientAuthGuard isNeedUser={false}>
      <div>
        <FindEmailForm />
        <Link href="/login">로그인으로 돌아가기</Link>
      </div>
    </ClientAuthGuard>
  );
}

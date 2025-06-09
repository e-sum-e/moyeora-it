'use client';

import Link from 'next/link';
import FindEmailForm from '@/components/organisms/find-email-form';
import { routes } from '@/utils/routes';

export default function Page() {
  return (
    <>
      <p className="font-extrabold text-center text-[#1F2937]">이메일 찾기</p>
      <FindEmailForm />
      <Link href={routes.login} className="text-[#00A79A] flex justify-center">
        로그인으로 돌아가기
      </Link>
    </>
  );
}

'use client';

import Link from 'next/link';
import FindPassword from '@/components/organisms/find-password-form';

export default function Page() {
  return (
    <>
      <p className="font-extrabold text-center text-[#1F2937]">비밀번호 찾기</p>
      <FindPassword />
      <Link href="/login" className="text-[#00A79A] flex justify-center">
        로그인으로 돌아가기
      </Link>
    </>
  );
}

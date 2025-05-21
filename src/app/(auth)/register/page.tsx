'use client';
import useAuthStore from '@/stores/useAuthStore';
import Link from 'next/link';
import RegisterForm from '@/components/organisms/register-form';
import RegisterOptionalForm from '@/components/organisms/register-optional-form';

export default function Page() {
  const user = useAuthStore((store) => store.user);

  return (
    <div>
      {/* 회원가입 전 로그인이 되지 않은 상태의 경우 회원가입 폼을 출력 */}
      {!user && <RegisterForm />}

      {/* 회원가입 후 로그인상태에서 출력,, 이메일은 있지만 아직 닉네임은 설정이 안됨 */}
      {user && <RegisterOptionalForm />}
      <Link href="/login">로그인으로 돌아가기</Link>
    </div>
  );
}

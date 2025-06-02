import Link from 'next/link';
import LoginForm from '@/components/organisms/login-form';
import { headers } from 'next/headers';
import LoginTriggerManager from '@/features/auth/components/LoginTriggerManager';

export default async function Page() {
  const headerList = await headers();
  // next-url: next에서 제공해주는 이전 path, Link나 router.push, redirect로 이동할 때 자등으로 저장됨
  const nextUrl = headerList.get('next-url') || '/';

  return (
    <>
      <div>
        <LoginForm />
        <div className="flex flex-col">
          <Link href="/register">회원가입</Link>
          <Link href="/find-email">이메일 찾기</Link>
          <Link href="/find-password">비밀번호 찾기</Link>
        </div>
      </div>
      <LoginTriggerManager prevPathname={nextUrl} />
    </>
  );
}

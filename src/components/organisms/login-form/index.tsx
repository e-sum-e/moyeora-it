'use client';

import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import { InputTextField } from '@/components/molecules/input-text-field';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import { request } from '@/api/request';
import { fetchAndSetUser } from '@/features/auth/utils/setUserInfo';

const formSchema = z.object({
  email: z.string().nonempty({ message: '이메일을 입력해주세요' }).email({
    message: '유효한 이메일이 아닙니다.',
  }),
  password: z.string().nonempty({ message: '비밀번호를 입력해주세요' }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [disabled, setDisabled] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  // 로그인
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setDisabled(true);
      // 로그인 로직 작성 /login
      // ISSUE: 성공 여부 처리추가 필요 const {status} = 
       await request.post(
        '/v1/user/login',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(values),
        {
          credentials: 'include',
        }
      );

      // 로그인 성공 후 회원정보 불러오기 /me
      await fetchAndSetUser(setUser);
      

      const prevPathname = localStorage.getItem('login-trigger-path') || '/';
      
      router.push(prevPathname);

      localStorage.removeItem('login-trigger-path');
    } catch (e) {
      // TODO: 로그인 실패시 에러코드 맞춰서 설정해주기
      setIsLoginFailed(true);
      console.log(e);
      setDisabled(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputTextField
          form={form}
          name="email"
          label="이메일"
          type="email"
          placeholder="myemail@mail.com"
        />
        <InputTextField
          form={form}
          name="password"
          label="비밀번호"
          type="password"
          placeholder="나만의 비밀번호..."
        />

        {isLoginFailed && <p className="text-red-600">로그인에 실패했습니다</p>}
        <Button disabled={disabled}>로그인</Button>
      </form>
    </Form>
  );
};

export default LoginForm;

'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputTextField } from '@/components/molecules/input-text-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import { request } from '@/api/request';
import { UserInfoResponse } from '@/types/response';

// 회원가입에 쓰이는 이메일과 비밀번호 유효성
const registerFormSchema = z
  .object({
    email: z.string().nonempty({ message: '이메일을 입력해주세요' }).email({
      message: '유효한 이메일이 아닙니다.',
    }),
    password: z
      .string()
      .nonempty({ message: '비밀번호를 입력해주세요' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: '영어, 숫자, 특수문자를 혼합하여 8자리 이상',
      }),
    passwordConfirm: z.string().nonempty({
      message: '비밀번호를 다시 입력해주세요',
    }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다.',
        code: z.ZodIssueCode.custom,
      });
    }
  });

const RegisterForm = () => {
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const setUser = useAuthStore((s) => s.setUser);

  // 회원가입
  const onRegisterSubmit = async (
    values: z.infer<typeof registerFormSchema>,
  ) => {
    try {
      // 회원가입 로직 작성 /user/signup
      // 에러처리 별도로 해줘야 할 수도 있음
      await request.post(
        '/user/signup',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      );

      await request.post(
        '/user/login',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(values),
      );

      // 회원가입 성공 후(즉시 로그인, 쿠키 바로 설정) 회원정보 불러오기 프로필 설정 setUser(user)
      const responseBody: UserInfoResponse = await request.get('/user/info');

      setUser({
        ...responseBody.items.items,
        userId: responseBody.items.items.id.toString(),
      });
    } catch (e) {
      // TODO: 회원가입 실패시 에러코드 맞춰서 설정해주기
      setIsRegisterFailed(true);
      console.log(e);
    }
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
        className="space-y-8"
      >
        <InputTextField
          form={registerForm}
          name="email"
          placeholder="이메일"
          type="email"
          label="이메일"
        />

        <InputTextField
          form={registerForm}
          name="password"
          placeholder="비밀번호"
          type="password"
          label="비밀번호"
        />

        <InputTextField
          form={registerForm}
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          type="password"
        />

        {isRegisterFailed && (
          <p className="text-red-600">회원가입에 실패했습니다</p>
        )}
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

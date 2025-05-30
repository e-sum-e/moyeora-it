'use client';

import { InputTextField } from '@/components/molecules/input-text-field';
import { FormRadioGroupField } from '@/components/molecules/input-radiogroup-field';
import { FormCheckboxGroupField } from '@/components/molecules/input-checkbox-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Position, Skill } from '@/types/enums';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { request } from '@/api/request';
import { User } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

const positions = Object.keys(Position).filter((k) => isNaN(Number(k))) as [
  string,
  ...string[],
];
const skills = Object.keys(Skill).filter((k) => isNaN(Number(k))) as [
  string,
  ...string[],
];

// 회원가입 후 옵셔널 정보 유효성
// 규칙을 네이버와 같이 했습니다
const optionalFormSchema = z.object({
  nickname: z.string().max(30, '닉네임은 30자리 이하여야 합니다.'),
  position: z.enum(positions, {
    message: '포지션을 선택해주세요',
  }),
  skills: z.array(z.enum(skills)),
});

const RegisterOptionalForm = () => {
  const [disabled, setDisabled] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  // 이 컴포넌트는 user가 존재할 때만 렌더링되므로, useAuthStore에서 user를 가져올 때는 !를 사용해도 됩니다.
  const currentUser = useAuthStore((s) => s.user)!;

  const optionalForm = useForm<z.infer<typeof optionalFormSchema>>({
    resolver: zodResolver(optionalFormSchema),
    defaultValues: {
      nickname: '',
      position: '',
      skills: [],
    },
  });

  const router = useRouter();

  // 옵션 설정
  const onOptionalSubmit = async (
    values: z.infer<typeof optionalFormSchema>,
  ) => {
    try {
      setDisabled(true);
      //  TODO: 프로필 옵션 설정
      const newValues: z.infer<typeof optionalFormSchema> = {
        ...values,
        nickname: values.nickname || currentUser.email, // 닉네임이 비어있으면 이메일로 설정
      };

      await request.post(
        '/me',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(newValues),
      );

      // 바뀐 프로필 다시 불러와서 설정
      const { user } = await request.get('/me');
      setUser(user as User);

      const prevPathname = localStorage.getItem('login-trigger-path') || '/';
      router.push(prevPathname);

      toast.success('회원가입 성공', {
        description: '어서오세요!',
      });

      localStorage.removeItem('login-trigger-path');
    } catch (e) {
      // TODO: 프로필 에러 설정 //
      console.log(e);
      setDisabled(false);
    }
  };
  return (
    <Form {...optionalForm}>
      <form
        onSubmit={optionalForm.handleSubmit(onOptionalSubmit)}
        className="space-y-8"
      >
        <InputTextField
          form={optionalForm}
          name="nickname"
          label="닉네임"
          type="text"
          placeholder="입력하지 않을 경우 이메일로 설정됩니다."
        />

        <FormRadioGroupField
          form={optionalForm}
          name="position"
          label="포지션"
          options={positions}
        />

        <FormCheckboxGroupField
          form={optionalForm}
          name="skills"
          label="기술 스택"
          options={skills}
        />
        <Button disabled={disabled}>프로필 설정하기</Button>
      </form>
    </Form>
  );
};

export default RegisterOptionalForm;

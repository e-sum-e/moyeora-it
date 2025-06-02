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
import { UserInfoResponse } from '@/types/response';

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
      // 프로필 옵션 설정
      const newValues: z.infer<typeof optionalFormSchema> = {
        ...values,
        nickname: values.nickname || currentUser.email, // 닉네임이 비어있으면 이메일로 설정
      };

      // request는 json 형태인데 api는 form-data로 받아서 별도의 fetch로 요청합니다.
      const formData = new FormData();
      formData.append('nickname', newValues.nickname);
      formData.append('position', newValues.position);

      if (newValues.skills.length > 0) {
        formData.append('skills', newValues.skills.join(','));
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/edit`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      // 바뀐 프로필 다시 불러와서 설정
      const responseBody: UserInfoResponse = await request.get('/v1/user/info');

      setUser({
        ...responseBody.items.items,
        userId: responseBody.items.items.id.toString(),
      });

      const prevPathname = localStorage.getItem('login-trigger-path') || '/';
      router.push(prevPathname);

      localStorage.removeItem('login-trigger-path');
    } catch (e) {
      // TODO: 프로필 에러 설정 //
      console.log(e);
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
        <Button>프로필 설정하기</Button>
      </form>
    </Form>
  );
};

export default RegisterOptionalForm;

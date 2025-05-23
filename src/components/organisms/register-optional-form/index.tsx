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
  nickname: z
    .string()
    .nonempty({
      message: '닉네임을 입력해주세요',
    })
    .min(2, '닉네임은 2~8자리여야 합니다.')
    .max(8, '닉네임은 2~8자리여야 합니다.')
    .regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/, '한글, 영어, 숫자만 입력 가능합니다.'),
  position: z.enum(positions, {
    message: '포지션을 선택해주세요',
  }),
  skills: z.array(z.enum(skills)),
});

const RegisterOptionalForm = () => {
  const optionalForm = useForm<z.infer<typeof optionalFormSchema>>({
    resolver: zodResolver(optionalFormSchema),
    defaultValues: {
      nickname: '',
      position: '',
      skills: [],
    },
  });

  const login = useAuthStore((s) => s.login);

  // 옵션 설정
  const onOptionalSubmit = async (
    values: z.infer<typeof optionalFormSchema>,
  ) => {
    try {
      //  TODO: 프로필 옵션 설정
      await fetch('http://localhost:4000/api/me', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 바뀐 프로필 다시 불러와서 설정
      const response = await fetch('http://localhost:4000/api/me');
      const { user } = await response.json();

      login(user);
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
          placeholder="닉네임"
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

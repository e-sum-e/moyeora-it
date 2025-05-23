import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { InputTextField } from '@/components/molecules/input-text-field';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().nonempty({ message: '이메일을 입력해주세요' }).email({
    message: '유효한 이메일이 아닙니다.',
  }),
});

const FindPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const [isNotExisted, setIsNotExisted] = useState(false);

  // reset-password일 경우
  const [isSuccessEmailSend, setIsSuccessEmailSend] = useState(false);

  // 이메일 찾기
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      // reset-password일 경우
      // TODO: 비밀번호 찾기 로직 작성 /find-email
      setIsSuccessEmailSend(true);
      console.log('비찾');
    } catch (e) {
      // TODO: 이메일 찾기 실패시 에러코드 맞춰서 설정해주기
      setIsNotExisted(true);
      console.log(e);
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

        {/* 이메일 전송시 로그인페이지로 가기*/}
        {isSuccessEmailSend && (
          <div className="flex flex-col">
            <p className="text-blue-900">이메일을 확인해주세요!</p>
            <Link href="/login">로그인하러 가기</Link>
          </div>
        )}

        {isNotExisted && (
          <p className="text-red-600">해당 이메일이 존재하지 않습니다</p>
        )}
        <Button>비밀번호 찾기</Button>
      </form>
    </Form>
  );
};

export default FindPassword;

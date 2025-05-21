'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import Link from 'next/link';
import { InputTextField } from '@/components/molecules/input-text-field';

const formSchema = z.object({
	email: z.string().nonempty({ message: '이메일을 입력해주세요' }).email({
		message: '유효한 이메일이 아닙니다.',
	}),
	password: z.string().nonempty({ message: '비밀번호를 입력해주세요' }),
});

export default function Page() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const [isLoginFailed, setIsLoginFailed] = useState(false);
	// const login = useAuthStore((s) => s.login);

	// 로그인
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		try {
			// TODO: 로그인 로직 작성 /login
			// TODO: 로그인 성공 후 회원정보 불러오기 /me
		} catch (e) {
			// TODO: 로그인 실패시 에러코드 맞춰서 설정해주기
			setIsLoginFailed(true);
			console.log(e);
		}
	};

	return (
		<div>
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

					{isLoginFailed && (
						<p className="text-red-600">로그인에 실패했습니다</p>
					)}
					<Button>로그인</Button>
				</form>
			</Form>
			<div className="flex flex-col">
				<Link href="/register">회원가입</Link>
				<Link href="/find-email">이메일 찾기</Link>
				<Link href="/reset-password">비밀번호 찾기</Link>
			</div>
		</div>
	);
}

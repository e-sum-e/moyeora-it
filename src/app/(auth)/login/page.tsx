"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { InputText } from "@/components/atoms/input-text";

const formSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요" }).email({
    message: "유효한 이메일이 아닙니다.",
  }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { login, user } = useAuthStore();

  // 로그인
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: 로그인 로직 작성 /login
      // TODO: 로그인 성공 후 회원정보 불러오기 /me
    } catch (e) {
      // TODO: 로그인 실패시 에러코드 맞춰서 설정해주기
      setIsLoginFailed(true);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <InputText placeholder="이메일" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <InputText
                    placeholder="비밀번호"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoginFailed && (
            <p className="text-red-600">로그인에 실패했습니다</p>
          )}
          <Button type="submit">로그인</Button>
        </form>
      </Form>
    </div>
  );
}

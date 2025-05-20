"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { Position, Skill } from "@/types";
import { InputTextField } from "@/components/molecules/input-text-field";
import { FormRadioGroupField } from "@/components/molecules/input-radiogroup-field";
import { FormCheckboxGroupField } from "@/components/molecules/input-checkbox-field";

const positions = Object.values(Position) as [string, ...string[]];
const skills = Object.values(Skill) as [string, ...string[]];

// 회원가입에 쓰이는 이메일과 비밀번호 유효성
// 규칙은 네이버와 똑같이 했습니다
const registerFormSchema = z
  .object({
    email: z.string().nonempty({ message: "이메일을 입력해주세요" }).email({
      message: "유효한 이메일이 아닙니다.",
    }),
    password: z
      .string()
      .nonempty({ message: "비밀번호를 입력해주세요" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "영어 대/소문자, 숫자, 특수문자를 혼합하여 8자리 이상",
      }),
    passwordConfirm: z.string().nonempty({
      message: "비밀번호를 다시 입력해주세요",
    }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// 회원가입 후 옵셔널 정보 유효성
// 규칙을 네이버와 같이 했습니다
const optionalFormSchema = z.object({
  nickname: z
    .string()
    .nonempty({
      message: "닉네임을 입력해주세요",
    })
    .min(2, "닉네임은 2~8자리여야 합니다.")
    .max(8, "닉네임은 2~8자리여야 합니다.")
    .regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/, "한글, 영어, 숫자만 입력 가능합니다."),
  position: z.enum(positions, {
    message: "포지션을 선택해주세요",
  }),
  skills: z.array(z.enum(skills)),
});

export default function Page() {
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const { user } = useAuthStore();

  const optionalForm = useForm<z.infer<typeof optionalFormSchema>>({
    resolver: zodResolver(optionalFormSchema),
    defaultValues: {
      nickname: "",
      position: "",
      skills: [],
    },
  });

  // 회원가입
  const onRegisterSubmit = async (
    values: z.infer<typeof registerFormSchema>
  ) => {
    console.log(values);
    try {
      // TODO: 회원가입 로직 작성 /register
      // TODO: 회원가입 성공 후 회원정보 불러오기 /me
    } catch (e) {
      // TODO: 회원가입 실패시 에러코드 맞춰서 설정해주기
      setIsRegisterFailed(true);
      console.log(e);
    }
  };

  // 옵션 설정
  const onOptionalSubmit = async (
    values: z.infer<typeof optionalFormSchema>
  ) => {
    console.log(values);
    try {
      //  TODO: 프로필 옵션 설정
    } catch (e) {
      // TODO: 프로필 에러 설정 //
      console.log(e);
    }
  };

  return (
    <div>
      {/* 회원가입 전 로그인이 되지 않은 상태의 경우 회원가입 폼을 출력 */}
      {!user && (
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
      )}

      {/* 회원가입 후 로그인상태에서 출력, 이메일은 있지만 아직 닉네임은 설정이 안됨 */}
      {!user && (
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
      )}
    </div>
  );
}

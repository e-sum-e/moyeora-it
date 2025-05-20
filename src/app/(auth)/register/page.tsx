"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { InputText } from "@/components/atoms/input-text";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Position, Skill } from "@/types";

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
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <InputText placeholder="이메일" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
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

            <FormField
              control={registerForm.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <InputText
                      placeholder="비밀번호 확인"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isRegisterFailed && (
              <p className="text-red-600">회원가입에 실패했습니다</p>
            )}
            <Button type="submit">회원가입</Button>
          </form>
        </Form>
      )}

      {/* 회원가입 후 로그인상태에서 출력, 이메일은 있지만 아직 닉네임은 설정이 안됨 */}
      {user && (
        <Form {...optionalForm}>
          <form
            onSubmit={optionalForm.handleSubmit(onOptionalSubmit)}
            className="space-y-8"
          >
            <FormField
              control={optionalForm.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <InputText placeholder="닉네임" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={optionalForm.control}
              name="position"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>포지션</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      {positions.map((position) => (
                        <FormItem
                          key={position}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={position}
                              className="hidden"
                            />
                          </FormControl>
                          <FormLabel
                            className={`font-normal p-1 rounded text-gray-600 cursor-pointer bg-gray-300 ${
                              optionalForm.watch("position") === position &&
                              "bg-red-300"
                            }`}
                          >
                            {position}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={optionalForm.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">기술 스택</FormLabel>
                    <FormDescription>기술들을 선택해주세요</FormDescription>
                  </div>
                  {skills.map((skill) => (
                    <FormField
                      key={skill}
                      control={optionalForm.control}
                      name="skills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={skill}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                className="hidden"
                                checked={field.value?.includes(skill)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, skill])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== skill
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel
                              className={`font-normal p-1 rounded text-gray-600 cursor-pointer bg-gray-300 ${
                                optionalForm.watch("skills").includes(skill) &&
                                "bg-red-300"
                              }`}
                            >
                              {skill}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>프로필 설정하기</Button>
          </form>
        </Form>
      )}
    </div>
  );
}

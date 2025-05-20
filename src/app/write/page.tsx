"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const formSchema = z.object({
    title: z
      .string()
      .trim()
      .nonempty({ message: "제목을 입력해주세요." })
      .max(30, {
        message: "제목이 너무 길어요. 30자 이내로 줄여주세요.",
      }),
    maxParticipants: z.coerce
      .number({ message: "모임의 정원을 설정해주세요." })
      .min(2, {
        message: "최소 인원은 2명이상이어야 해요.",
      })
      .max(30, {
        message: "최대 인원은 30명까지 가능합니다.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const formSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>정원</FormLabel>
              <FormControl>
                <Input
                  placeholder="정원을 입력해주세요"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button">취소하기</Button>
        <Button type="submit">등록하기</Button>
      </form>
    </Form>
  );
}

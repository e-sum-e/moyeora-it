"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverContent } from "@radix-ui/react-popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const [isDeadlineOpen, setIsDeadlineOpen] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

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
    deadline: z.date(),
    startDate: z.date(),
    endDate: z.date(),
  });

  /** calendar에서 날짜 선택 후 calendar가 닫히게 하기 위한 함수 */
  const dealineSelect = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void
  ) => {
    if (!date) return;

    onChange(date);
    setIsDeadlineOpen(false);
  };

  const startDateSelect = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void
  ) => {
    if (!date) return;

    onChange(date);
    setIsStartDateOpen(false);
  };

  const endDateSelect = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void
  ) => {
    if (!date) return;

    onChange(date);
    setIsEndDateOpen(false);
  };

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
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>모집 마감일</FormLabel>
              <Popover open={isDeadlineOpen} onOpenChange={setIsDeadlineOpen}>
                <div>
                  {field.value
                    ? format(field.value, "PPP")
                    : "날짜를 선택해주세요."}
                </div>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button type="button" className="w-[fit-content]">
                      <CalendarIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      dealineSelect(e, field.onChange);
                    }}
                    disabled={(date) => date < addDays(new Date(), 6)}
                    className="bg-blue-100"
                  />
                </PopoverContent>
              </Popover>
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
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>모임 시작일</FormLabel>
              <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <div>
                  {field.value
                    ? format(field.value, "PPP")
                    : "날짜를 선택해주세요."}
                </div>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button type="button" className="w-[fit-content]">
                      <CalendarIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      startDateSelect(e, field.onChange);
                    }}
                    disabled={(date) => date < addDays(new Date(), 7)}
                    className="bg-pink-100"
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>모임 종료일</FormLabel>
              <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <div>
                  {field.value
                    ? format(field.value, "PPP")
                    : "날짜를 선택해주세요."}
                </div>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button type="button" className="w-[fit-content]">
                      <CalendarIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      endDateSelect(e, field.onChange);
                    }}
                    disabled={(date) => date < addDays(new Date(), 13)}
                    className="bg-purple-100"
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="button">취소하기</Button>
        <Button type="submit">등록하기</Button>
      </form>
    </Form>
  );
}

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
import { addDays, format, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
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
    deadline: z.date().min(addDays(new Date(), 6), {
      message: "모집 마감일은 오늘로부터 7일 이후부터 설정 가능합니다.",
    }),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => isAfter(data.startDate, addDays(data.deadline, 1)), {
    message: "모임 시작일은 모집 마감일로부터 1일 이후여야 합니다.",
    path: ["startDate"],
  })
  .refine((data) => isAfter(data.endDate, addDays(data.startDate, 6)), {
    message: "모임 종료일은 모집 시작일로부터 7일 이후여야 합니다.",
    path: ["endDate"],
  });

export default function Page() {
  const [isDeadlineOpen, setIsDeadlineOpen] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const [validDeadline, setValidDeadline] = useState(addDays(new Date(), 7));

  const validStartDate = useMemo(
    () => addDays(validDeadline, 0),
    [validDeadline]
  );
  const validEndDate = useMemo(
    () => addDays(validStartDate, 6),
    [validStartDate]
  );

  /** calendar에서 날짜 선택 후 calendar가 닫히게 하기 위한 함수 */
  const dealineSelect = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void
  ) => {
    if (!date) return;

    onChange(date);
    setValidDeadline(date);
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
    resolver: zodResolver(formSchema), // 유효성 검사는 zodResolver로 한다
    reValidateMode: "onSubmit", // submit 시에만 유효성 검사
    defaultValues: {
      title: "",
      maxParticipants: 1,
      deadline: validDeadline,
      startDate: validStartDate,
      endDate: validEndDate,
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
                  {field.value ? (
                    format(field.value, "yyyy.MM.dd")
                  ) : (
                    <>
                      <div className="text-gray-500">
                        {format(validDeadline, "yyyy.MM.dd")}
                      </div>
                      <div>날짜를 선택해주세요.</div>
                    </>
                  )}
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
                    disabled={{ before: validDeadline }}
                    className="bg-blue-100"
                  />
                </PopoverContent>
              </Popover>
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
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>모임 시작일</FormLabel>
              <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <div>
                  {field.value ? (
                    format(field.value, "yyyy.MM.dd")
                  ) : (
                    <>
                      <div className="text-gray-500">
                        {format(validStartDate, "yyyy.MM.dd")}
                      </div>
                      <div>날짜를 선택해주세요.</div>
                    </>
                  )}
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
                    disabled={{ before: validStartDate }}
                    className="bg-pink-100"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
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
                  {field.value ? (
                    format(field.value, "yyyy.MM.dd")
                  ) : (
                    <>
                      <div className="text-gray-500">
                        {format(validStartDate, "yyyy.MM.dd")}
                      </div>
                      <div>날짜를 선택해주세요.</div>
                    </>
                  )}
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
                    disabled={{ before: validEndDate }}
                    className="bg-purple-100"
                  />
                </PopoverContent>
              </Popover>
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

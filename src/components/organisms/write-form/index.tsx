'use client';

import { request } from '@/api/request';
import { AutoAllow } from '@/components/molecules/write-form/autoAllow';
import { DeadlineCalendar } from '@/components/molecules/write-form/deadlineCalendar';
import { EndDateCalendar } from '@/components/molecules/write-form/endDateCalendar';
import { MaxParticipants } from '@/components/molecules/write-form/maxParticipants';
import { SelectType } from '@/components/molecules/write-form/selcetType';
import { SelectSkill } from '@/components/molecules/write-form/selectSkill';
import { StartDateCalendar } from '@/components/molecules/write-form/startDateCalendar';
import { Description } from '@/components/molecules/write-form/tiptap/desctiption';
import { Title } from '@/components/molecules/write-form/title';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DEFAULT_SKILL_NAMES, GroupType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, isAfter } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    title: z
      .string()
      .trim()
      .nonempty({ message: '제목을 입력해주세요.' })
      .max(30, {
        message: '제목이 너무 길어요. 30자 이내로 줄여주세요.',
      }),
    maxParticipants: z.coerce
      .number({ message: '모임의 정원을 설정해주세요.' })
      .min(2, {
        message: '최소 인원은 2명이상이어야 해요.',
      })
      .max(30, {
        message: '최대 인원은 30명까지 가능합니다.',
      }),
    deadline: z.date().min(addDays(new Date(), 6), {
      message: '모집 마감일은 오늘로부터 7일 이후부터 설정 가능합니다.',
    }),
    startDate: z.date(),
    endDate: z.date(),
    description: z
      .string()
      .min(20, { message: '내용을 좀 더 자세하게 적어주세요.' }),
    autoAllow: z.boolean(),
    type: z.enum([GroupType.STUDY, GroupType.PROJECT]),
    skills: z
      .array(
        z.union([
          z.enum(DEFAULT_SKILL_NAMES), // 미리 정해진 skill과
          z.string(), // 유저가 입력한 커스텀 skill을 합친 union 타입 형태로 유효성 검사
        ]),
      )
      .min(1, { message: '사용 기술을 한가지 이상 선택해주세요.' }),
  })
  .refine((data) => isAfter(data.startDate, addDays(data.deadline, 0)), {
    message: '모임 시작일은 모집 마감일로부터 1일 이후여야 합니다.',
    path: ['startDate'],
  })
  .refine((data) => isAfter(data.endDate, addDays(data.startDate, 6)), {
    message: '모임 종료일은 모집 시작일로부터 7일 이후여야 합니다.',
    path: ['endDate'],
  });

export const WriteForm = () => {
  const [isDeadlineCalendarOpen, setIsDeadlineCalendarOpen] = useState(false);
  const [isStartDateCalendarOpen, setIsStartDateCalendarOpen] = useState(false);
  const [isEndDateCalendarOpen, setIsEndDateCalendarOpen] = useState(false);
  const [validDeadline, setValidDeadline] = useState(addDays(new Date(), 7));
  const router = useRouter();

  const validStartDate = useMemo(
    () => addDays(validDeadline, 1),
    [validDeadline],
  );
  const validEndDate = useMemo(
    () => addDays(validStartDate, 6),
    [validStartDate],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // 유효성 검사는 zodResolver로 한다
    reValidateMode: 'onSubmit', // submit 시에만 유효성 검사
    defaultValues: {
      title: '',
      maxParticipants: 2,
      description: '',
      autoAllow: false,
      type: GroupType.STUDY,
    },
  });

  const formSubmit = async (values: z.infer<typeof formSchema>) => {
    const valueCreatedAt = { ...values, createdAt: new Date() };

    try {
      const result = await request.post(
        '/api/group',
        { 'Content-Type': 'application/json' },
        JSON.stringify(valueCreatedAt),
      );

      if (result.success) {
        router.push('/');
      } else {
        // 에러 임시 처리
        console.log('Group create error : ', result.code);
      }
    } catch (error) {
      // 에러 임시 처리
      console.log('Group create error: ', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <Title form={form} />
        <SelectType form={form} />
        <DeadlineCalendar
          form={form}
          isDeadlineCalendarOpen={isDeadlineCalendarOpen}
          setValidDeadline={setValidDeadline}
          openDeadlineCalendar={() => setIsDeadlineCalendarOpen(true)}
          closeDeadlineCalendar={() => setIsDeadlineCalendarOpen(false)}
          validDeadline={validDeadline}
        />
        <MaxParticipants form={form} />
        <AutoAllow form={form} />
        <StartDateCalendar
          form={form}
          isStartDateCalendarOpen={isStartDateCalendarOpen}
          openStartDateCalendar={() => setIsStartDateCalendarOpen(true)}
          closeStartDateCalendar={() => setIsStartDateCalendarOpen(false)}
          validStartDate={validStartDate}
        />
        <EndDateCalendar
          form={form}
          isEndDateCalendarOpen={isEndDateCalendarOpen}
          openEndDateCalendar={() => setIsEndDateCalendarOpen(true)}
          closeEndDateCalendar={() => setIsEndDateCalendarOpen(false)}
          validEndDate={validEndDate}
        />
        <Description form={form} />
        <SelectSkill form={form} />
        <Button type="button">취소하기</Button>
        <Button type="submit">등록하기</Button>
      </form>
    </Form>
  );
};

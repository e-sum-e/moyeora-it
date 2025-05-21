'use client';

import { DeadlineCalendar } from '@/components/molecules/write-form/deadlineCalendar';
import { EndDateCalendar } from '@/components/molecules/write-form/endDateCalendar';
import { MaxParticipants } from '@/components/molecules/write-form/maxParticipants';
import { StartDateCalendar } from '@/components/molecules/write-form/startDateCalendar';
import { Title } from '@/components/molecules/write-form/title';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, isAfter } from 'date-fns';
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
	})
	.refine((data) => isAfter(data.startDate, addDays(data.deadline, 1)), {
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
			maxParticipants: 1,
		},
	});

	const formSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(formSubmit)}>
				<Title form={form} />
				<DeadlineCalendar
					form={form}
					isDeadlineCalendarOpen={isDeadlineCalendarOpen}
					setValidDeadline={setValidDeadline}
					openDeadlineCalendar={() => setIsDeadlineCalendarOpen(true)}
					closeDeadlineCalendar={() => setIsDeadlineCalendarOpen(false)}
					validDeadline={validDeadline}
				/>
				<MaxParticipants form={form} />
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
				<Button type="button">취소하기</Button>
				<Button type="submit">등록하기</Button>
			</form>
		</Form>
	);
};

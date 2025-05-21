import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { WriteForm } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
	form: UseFormReturn<WriteForm>;
	isEndDateCalendarOpen: boolean;
	openEndDateCalendar: () => void;
	closeEndDateCalendar: () => void;
	validEndDate: Date;
};

export const EndDateCalendar = ({
	form,
	isEndDateCalendarOpen,
	openEndDateCalendar,
	closeEndDateCalendar,
	validEndDate,
}: TitleProps) => {
	/** calendar에서 날짜 선택 후 calendar가 닫히게 하기 위한 함수 */
	const endDateSelect = (
		date: Date | undefined,
		onChange: (date: Date | undefined) => void,
	) => {
		if (!date) return;

		onChange(date);
		closeEndDateCalendar();
	};

	return (
		<>
			<FormField
				control={form.control}
				name="endDate"
				render={({ field }) => (
					<FormItem>
						<FormLabel>모임 종료일</FormLabel>
						<Popover
							open={isEndDateCalendarOpen}
							onOpenChange={
								isEndDateCalendarOpen
									? closeEndDateCalendar
									: openEndDateCalendar
							}
						>
							<div>
								{field.value ? (
									format(field.value, 'yyyy.MM.dd')
								) : (
									<>
										<div className="text-gray-500">
											{format(validEndDate, 'yyyy.MM.dd')}
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
		</>
	);
};

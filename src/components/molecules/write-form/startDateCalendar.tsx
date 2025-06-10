import { WriteFormLabel } from '@/components/atoms/write-form/form-label';
import { Button } from '@/components/ui//button';
import { Calendar } from '@/components/ui//calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui//form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui//popover';
import { WriteForm } from '@/types';
import { formatYearMonthDayWithDot } from '@/utils/dateUtils';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
  isStartDateCalendarOpen: boolean;
  openStartDateCalendar: () => void;
  closeStartDateCalendar: () => void;
  validStartDate: Date;
};

export const StartDateCalendar = ({
  form,
  isStartDateCalendarOpen,
  openStartDateCalendar,
  closeStartDateCalendar,
  validStartDate,
}: TitleProps) => {
  /** calendar에서 날짜 선택 후 calendar가 닫히게 하기 위한 함수 */
  const startDateSelect = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void,
  ) => {
    if (!date) return;

    onChange(date);
    closeStartDateCalendar();
  };

  return (
    <>
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <WriteFormLabel text="모임 시작일" />
            <Popover
              open={isStartDateCalendarOpen}
              onOpenChange={
                isStartDateCalendarOpen
                  ? closeStartDateCalendar
                  : openStartDateCalendar
              }
            >
              <div className="flex items-center gap-5">
                <div>
                  {field.value ? (
                    formatYearMonthDayWithDot(field.value)
                  ) : (
                    <>
                      <div className="text-gray-500">
                        {formatYearMonthDayWithDot(validStartDate)}
                      </div>
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
                  />
                </PopoverContent>
              </div>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

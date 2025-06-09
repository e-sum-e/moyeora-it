import { WriteFormLabel } from '@/components/atoms/write-form/form-label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { WriteForm } from '@/types';
import { formatYearMonthDayWithDot } from '@/utils/dateUtils';
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
            <WriteFormLabel text="모임 종료일" />
            <Popover
              open={isEndDateCalendarOpen}
              onOpenChange={
                isEndDateCalendarOpen
                  ? closeEndDateCalendar
                  : openEndDateCalendar
              }
            >
              <div className="flex items-center gap-5">
                <div>
                  {field.value ? (
                    formatYearMonthDayWithDot(field.value)
                  ) : (
                    <>
                      <div className="text-gray-500">
                        {formatYearMonthDayWithDot(validEndDate)}
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
                      endDateSelect(e, field.onChange);
                    }}
                    disabled={{ before: validEndDate }}
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

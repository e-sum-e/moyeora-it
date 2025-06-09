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
  isDeadlineCalendarOpen: boolean;
  deadlineSelect: (date: Date) => void;
  openDeadlineCalendar: () => void;
  closeDeadlineCalendar: () => void;
  validDeadline: Date;
};

export const DeadlineCalendar = ({
  form,
  isDeadlineCalendarOpen,
  deadlineSelect,
  openDeadlineCalendar,
  closeDeadlineCalendar,
  validDeadline,
}: TitleProps) => {
  /** calendar에서 날짜 선택 후 calendar가 닫히게 하기 위한 함수 */
  const dealineSelect = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void,
  ) => {
    if (!date) return;

    deadlineSelect(date);
    onChange(date);
    // setValidDeadline(date);
    closeDeadlineCalendar();
  };

  return (
    <>
      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => (
          <FormItem>
            <WriteFormLabel text="모집 마감일" className="" />
            <Popover
              open={isDeadlineCalendarOpen}
              onOpenChange={
                isDeadlineCalendarOpen
                  ? closeDeadlineCalendar
                  : openDeadlineCalendar
              }
            >
              <div className="flex items-center gap-5">
                <div>
                  {field.value ? (
                    formatYearMonthDayWithDot(field.value)
                  ) : (
                    <>
                      <div className="text-gray-400">
                        {formatYearMonthDayWithDot(validDeadline)}
                      </div>
                    </>
                  )}
                </div>
                <PopoverTrigger asChild>
                  <FormControl className="inline-block">
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

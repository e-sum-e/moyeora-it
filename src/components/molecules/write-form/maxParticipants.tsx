import { WriteFormLabel } from '@/components/atoms/write-form/form-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WriteForm } from '@/types';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const MaxParticipants = ({ form }: TitleProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="maxParticipants"
        render={({ field }) => (
          <FormItem>
            <WriteFormLabel htmlFor="maxParticipants" text="정원" />
            <FormControl>
              <Input
                id="maxParticipants"
                placeholder="정원을 입력해주세요"
                {...field}
                type="number"
                max="30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

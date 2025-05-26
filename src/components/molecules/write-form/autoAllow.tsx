import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { WriteForm } from '@/types';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const AutoAllow = ({ form }: TitleProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="autoAllow"
        render={(field) => (
          <FormItem>
            <FormLabel htmlFor="autoAllow">참가자 자동 수락</FormLabel>
            <FormControl>
              <Checkbox
                id="autoAllow"
                onClick={() => {
                  /** 클릭 시 field의 값을 받아서 토글 */
                  form.setValue('autoAllow', !field.field.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

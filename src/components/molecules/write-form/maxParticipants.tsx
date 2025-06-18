import { WriteFormLabel } from '@/components/atoms/write-form/form-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WriteForm } from '@/types';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const MaxParticipants = ({ form }: TitleProps) => {
  const [maxParticipants, setMaxParticipants] = useState(2);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 30) {
      setMaxParticipants(30);
      return;
    }
    if (value < 2) {
      setMaxParticipants(2);
      return;
    }

    setMaxParticipants(value);
  };

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
                min={2}
                max={30}
                placeholder="정원을 입력해주세요"
                {...field}
                type="number"
                onChange={inputChangeHandler}
                value={maxParticipants}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
